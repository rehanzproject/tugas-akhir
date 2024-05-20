import CompletionCourse from "../model/CompletionCourseModel.js";
import Course from "../model/CourseModel.js";
import ReviewCourse from "../model/ReviewCourseModel.js";

export const getCompletion = async (req, res) => {
  try {
    const findReview = await CompletionCourse.findAll({
      where: {
        user_id: req.user_id,
      },
    });
    if (!findReview) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Certificate not Found",
        success: false,
      });
    }
    res.status(200).json({
      code: 200,
      status: "Created",
      message: "Success Get Certificate",
      success: true,
      data: findReview,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const ReviewCourses = async (req, res) => {
  try {
    const { rating, description } = req.body;
    const findReview = await ReviewCourse.findOne({
      where: {
        user_id: req.user_id,
        course_id: req.query.id,
      },
    });
    if (findReview) {
      return res.status(409).json({
        code: 409,
        status: "Conflict",
        message: "Review already exists",
        success: false,
      });
    }

    // Check if the user has completed the course
    const findCompletion = await CompletionCourse.findOne({
      where: {
        user_id: req.user_id,
        course_id: req.query.id,
      },
    });

    if (!findCompletion) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Course completion not found",
        success: false,
      });
    }

    // Find the course
    const getCourse = await Course.findOne({
      where: {
        id: req.query.id,
      },
    });

    if (!getCourse) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Course not found",
        success: false,
      });
    }
    switch (rating) {
      case "rating1":
        await getCourse.update({
          rating1: getCourse.rating1 + 1,
          description: description,
        });
        break;
      case "rating2":
        await getCourse.update({
          rating2: getCourse.rating2 + 1,
          description: description,
        });
        break;
      case "rating3":
        await getCourse.update({
          rating3: getCourse.rating3 + 1,
          description: description,
        });
        break;
      case "rating4":
        await getCourse.update({
          rating4: getCourse.rating4 + 1,
          description: description,
        });
        break;
      case "rating5":
        await getCourse.update({
          rating5: getCourse.rating5 + 1,
          description: description,
        });
        break;
      default:
        res.status(400).json({
          code: 400,
          status: "Not Found",
          message: "Review Not Found",
          success: false,
        });
        break;
    }
    res.status(201).json({
      code: 201,
      status: "Created",
      message: "Review added successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
