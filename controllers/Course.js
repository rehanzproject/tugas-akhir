import { Op, Sequelize } from "sequelize";
import Checkout from "../model/CheckoutModel.js";
import Course from "../model/CourseModel.js";
import Modules from "../model/ModulesModel.js";
import CompletionModule from "../model/CompletionModuleModel.js";
import Users from "../model/UserModel.js";

export const AddCourse = async (req, res) => {
  try {
    const { name, description, price, coupon } = req.body;
    const findNameCourse = await Course.findAll({
      where: {
        name: name,
      },
    });
    if (findNameCourse.length)
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Name already exist",
        success: false,
      });
    const newCourse = await Course.create({
      user_id: req.userId,
      name,
      description,
      price,
      coupon,
    });
    res.status(201).json({
      code: 201,
      status: "Created",
      message: "Create Course Successfully",
      success: true,
      data: newCourse,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};
export const updateCourse = async (req, res) => {
  try {
    const { name, description, price, coupon } = req.body;
    const findNameCourse = await Course.findOne({
      where: {
        course_id: req.query.id,
      },
    });
    if (!findNameCourse)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Course Not Found",
        success: false,
      });
    const updatedCourse = await findNameCourse.update({
      name,
      description,
      price,
      coupon,
    });
    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Update Course Successfully",
      success: true,
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findOne({
      where: {
        course_id: req.query.id,
      },
    });
    if (!deletedCourse)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Course Not Found",
        success: false,
      });
    const deleteData = await Course.destroy({
      where: {
        course_id: deletedCourse.course_id,
      },
    });
    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Course Deleted Successfully",
      success: true,
      data: deleteData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const { size, page } = req.query;
    const getCourses = await Course.findAndCountAll({
      limit: parseInt(size),
      offset: (page - 1) * size,
      include: {
        model: Modules,
        attributes: ["name"],
      },
    });

    if (!getCourses.rows.length)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Course Not Found",
        success: false,
      });

    res.json({
      code: 200,
      status: "OK",
      message: "Success Get Data",
      success: true,
      data: getCourses.rows, // Return the actual data
      page: {
        size: parseInt(size),
        total: getCourse.count,
        page: parseInt(page),
        totalPages: Math.ceil(getCourses.count / parseInt(size)),
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};
export const getCourseDetail = async (req, res) => {
  try {
    const getCourses = await Course.findOne({
      where: {
        course_id: req.query.id,
      },
      include: [
        {
          model: Modules,
          order: [['createdAt', 'ASC']],
        },
        {
          model: Users,
          attributes: ["name"],
        },
      ],
    });

    if (!getCourses)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Course Not Found",
        success: false,
      });
      if (getCourses.modules) {
        getCourses.modules.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }
    res.json({
      code: 200,
      status: "OK",
      message: "Success Get Data",
      success: true,
      data: getCourses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};
export const resumeCourse = async (req, res) => {
  try {
    const { id, name } = req.query;
    // Find the CompletionModule for the user based on course ID
    const getModules = await CompletionModule.findAll({
      where: {
        course_id: id,
      },
     
    });

    if (!getModules.length) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Modules Not Found",
        success: false,
      });
    }

    // // Prepare response data
    // const responseData = getModules.map((module) => ({
    //   moduleName: module.name, // Assuming there's a name field in CompletionModule
    //   courseName: module.course.name, // Course name from the association
    //   userName: module.user.name, // User name from the association
    //   score: module.score, // Assuming there's a score field in CompletionModule
    // }));

    res.json({
      code: 200,
      status: "OK",
      message: "Success Get Data",
      success: true,
      data: {  getModules },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};
export const getCourseUserCheckout = async (req, res) => {
  try {
    let responseWithoutModules = {
      code: 200,
      status: "Success",
      message: "User has access to the course",
      success: true,
      data: {
        // Add any other relevant data here
      },
    };

    const getUserCourse = await Checkout.findAll({
      where: {
        user_id: req.userId,
        verify: true,
      },
    });
    if (!getUserCourse || getUserCourse.length === 0) {
      // User hasn't checked out the course
      return res.status(400).json({
        code: 400,
        status: "Not Found",
        message: "Unable to retrieve course for user",
        success: false,
        data: responseWithoutModules.data, // Send the response structure without Modules
      });
    }

    // User has checked out the course, include modules
    const getModule = await Course.findAll({
      where: { course_id: getUserCourse.course_id },
      include: { model: Modules },
    });

    responseWithoutModules.data.modules = getModule.modules;

    res.status(200).json(responseWithoutModules);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
    });
  }
};

export const searchCourse = async (req, res) => {
  try {
    const { search } = req.query;
    const getCourses = await Course.findAll({
      where: {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
    });

    if (!getCourses.length)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Course Not Found",
        success: false,
      });

    res.json({
      code: 200,
      status: "OK",
      message: "Success Get Data",
      success: true,
      data: getCourses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};

export const getSummaryUser = async (req, res) => {
  try {
    const { name, id } = req.query;

    // Find user and calculate the average score
    const user = await CompletionModule.findAll({
      where: {
        course_id: id,
      },
      include: [{
        model: Users,
        attributes: ['name', 'phone', 'image', 'nim'],
        where: { name },
      },{
        model: Modules,
        attributes: ['module_id', 'name']
      }]
     
    });

    res.json({
      code: 200,
      status: "OK",
      message: "Successfully retrieved user summary",
      success: true,
      data: user,
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
