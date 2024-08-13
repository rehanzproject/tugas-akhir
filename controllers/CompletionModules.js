import Checkout from "../model/CheckoutModel.js";
import CompletionModule from "../model/CompletionModuleModel.js";
import Course from "../model/CourseModel.js";
import { Op } from "sequelize";
import Modules from "../model/ModulesModel.js";
import Users from "../model/UserModel.js";
import CompletionCourse from "../model/CompletionCourseModel.js";

export const getModuleUserCheckout = async (req, res) => {
  try {
    // Find verified checkouts for the user
    const findCheckouts = await Checkout.findAll({
      where: {
        user_id: req.userId,
        verify: true,
      },
      include: {
        model: Course,
        attributes: ["course_id", "name", "thumbnail", "price"],
      },
    });

    if (!findCheckouts.length) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Checkout Not Found",
        success: false,
      });
    }

    // Retrieve course IDs from checkouts
    const checkoutCourseIds = findCheckouts.map(
      (checkout) => checkout.course_id
    );

    // Retrieve all completion modules for the user related to the checked-out courses
    const getModules = await CompletionModule.findAll({
      where: {
        user_id: req.userId,
        course_id: {
          [Op.in]: checkoutCourseIds,
        },
      },
    });

    // Get the total number of modules for each course
    const totalModulesByCourse = await Modules.findAll({
      where: {
        course_id: {
          [Op.in]: checkoutCourseIds,
        },
      },
    });

    // Group totalModulesByCourse by course_id
    const totalModulesCountByCourse = totalModulesByCourse.reduce(
      (acc, module) => {
        if (!acc[module.course_id]) {
          acc[module.course_id] = 0;
        }
        acc[module.course_id]++;
        return acc;
      },
      {}
    );

    // Group completed modules by course_id
    const completedModulesCountByCourse = getModules.reduce((acc, module) => {
      if (module.score !== null) {
        if (!acc[module.course_id]) {
          acc[module.course_id] = 0;
        }
        acc[module.course_id]++;
      }
      return acc;
    }, {});

    // Combine course details, totalComplete, and totalModules for each course
    const courseCompletionData = findCheckouts.map((checkout) => ({
      course: checkout.course,
      totalComplete: completedModulesCountByCourse[checkout.course_id] || 0,
      totalModules: totalModulesCountByCourse[checkout.course_id] || 0,
    }));

    res.json({
      code: 200,
      status: "OK",
      message: "Success Get Data",
      success: true,
      data: {
        courseCompletionData,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};
export const checkWhoEnrolled = async (req, res) => {
  const { course_id } = req.query;

  if (!course_id) {
    return res.status(400).json({
      code: 400,
      status: "Bad Request",
      message: "Course ID is required",
      success: false,
    });
  }

  try {
    const completionCourses = await CompletionCourse.findAll({
      where: {
        course_id: course_id,
      },
      include: [
        {
          model: Users,
          attributes: ["user_id", "name", "email", "nim", "prodi"],
        },
        {
          model: Course,
          attributes: ["course_id", "name"],
        },
      ],
    });

    if (completionCourses.length === 0) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "No completion courses found for the provided course_id",
        success: false,
      });
    }

    const filteredData = completionCourses.map((completion) => ({
      course_id: completion.course.course_id,
      course_name: completion.course.name,
      user: completion.user,
      score: completion.score,
    }));

    // Sort the data by prodi and name
    filteredData.sort((a, b) => {
      if (a.user.prodi < b.user.prodi) return -1;
      if (a.user.prodi > b.user.prodi) return 1;
      if (a.user.name < b.user.name) return -1;
      if (a.user.name > b.user.name) return 1;
      return 0;
    });

    res.json({
      code: 200,
      status: "OK",
      message: "Successfully retrieved completion courses",
      success: true,
      data: filteredData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};
export const checkMaterial = async (req, res) => {
  try {
    const courseId = req.query.id;

    const findCourse = await Course.findOne({
      where: { course_id: courseId },
      include: {
        model: Modules,
        attributes: ["module_id", "name", "createdAt"], // Ensure createdAt is included
        order: [["createdAt", "ASC"]], // This should be in the correct place
      },
      order: [[Modules, "createdAt", "ASC"]],
    });

    if (!findCourse) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Course Not Found",
        success: false,
      });
    }
    console.log(req.userId);
    const completionModules = await CompletionModule.findAll({
      where: {
        user_id: req.userId,
        course_id: courseId,
      },
    });

    const modulesWithCompletion = findCourse.modules.map((module) => {
      const completion = completionModules.find(
        (completionModule) => completionModule.module_id === module.module_id
      );
      return {
        ...module.toJSON(),
        is_completed: !!completion,
        score: completion?.score,
      };
    });

    const allCompleted = modulesWithCompletion.every(
      (module) => module.is_completed
    );
    let averageScore = null;

    if (allCompleted) {
      const totalScore = modulesWithCompletion.reduce(
        (acc, module) => acc + (module.score || 0),
        0
      );
      averageScore = totalScore / modulesWithCompletion.length;

      // Check if the course is already marked as completed
      const existingCompletion = await CompletionCourse.findOne({
        where: {
          user_id: req.userId,
          course_id: courseId,
        },
      });

      if (!existingCompletion) {
        // Create a new CompletionCourse entry
        await CompletionCourse.create({
          user_id: req.userId,
          course_id: courseId,
          score: averageScore,
        });
      }
    }

    res.json({
      code: 200,
      status: "OK",
      message: "Successfully retrieved completed courses",
      success: true,
      data: {
        course: {
          ...findCourse.toJSON(),
          modules: modulesWithCompletion,
          average_score: averageScore,
          is_course_completed: allCompleted,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};

export const addCompletionModule = async (req, res) => {
  try {
    // Find completion module for the user
    const findCompletion = await CompletionModule.findOne({
      where: {
        user_id: req.userId,
        module_id: req.query.id,
        course_id: req.query.course_id,
      },
    });

    // If a completion module exists and has a score, return 404
    if (findCompletion && findCompletion.score !== null) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Completion module already exists with a score",
        success: false,
      });
    }

    // If no completion module is found or if it exists but has no score, create a new one
    const addCompletion = await CompletionModule.create({
      user_id: req.userId,
      module_id: req.query.id,
      course_id: req.query.course_id,
      score: req.query.score,
    });

    res.json({
      code: 200,
      status: "OK",
      message: "Completion module added successfully",
      success: true,
      data: addCompletion,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};
