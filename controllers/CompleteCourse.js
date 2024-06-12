import CompletionModule from "../model/CompletionModuleModel.js"; // Assuming this is the model for modules
import CompletionCourse from "../model/CompletionCourseModel.js";
import Course from "../model/CourseModel.js";
import ReviewCourse from "../model/ReviewCourseModel.js";
import Users from "../model/UserModel.js";

export const getCompletionCourse = async (req, res) => {
  try {
    // Find all courses the user has completed
    const completedCourses = await CompletionCourse.findAll({
      where: { user_id: req.userId },
      include: {
        model: Course,
        attributes: ["thumbnail", "name", "course_id"],
      },
    });

    if (!completedCourses || completedCourses.length === 0) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Certificate not Found",
        success: false,
      });
    }

    // Check if the user has completed all modules for each course
    const courses = await Promise.all(
      completedCourses.map(async (course) => {
        const { course_id } = course;
        const totalModules = await CompletionModule.count({
          where: { course_id },
        });
        const completedModules = await CompletionModule.count({
          where: { course_id, user_id: req.userId },
        });

        const isCourseCompleted = completedModules === totalModules;

        return {
          ...course.dataValues,
          isCourseCompleted,
        };
      })
    );

    // Filter out the courses that are not fully completed
    const fullyCompletedCourses = courses.filter(
      (course) => course.isCourseCompleted
    );

    if (fullyCompletedCourses.length === 0) {
      return res.status(200).json({
        code: 200,
        status: "OK",
        message: "You have not fully completed any courses",
        success: true,
        data: completedCourses,
      });
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Success! You have cleared the course(s)",
      success: true,
      data: fullyCompletedCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      success: false,
      errors: error,
    });
  }
};
