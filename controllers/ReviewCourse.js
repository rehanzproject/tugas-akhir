import CompletionCourse from "../model/CompletionCourseModel.js";
import Course from "../model/CourseModel.js";
import ReviewCourse from "../model/ReviewCourseModel.js";
import Users from "../model/UserModel.js";

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
    const userId = req.userId;
    const courseId = req.query.id;

    // Check if the review already exists
    const findReview = await ReviewCourse.findOne({
      where: {
        user_id: userId,
        course_id: courseId,
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

    // Check if the course exists
    const getCourse = await Course.findOne({
      where: {
        course_id: courseId,
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

    // Update the course ratings
    switch (rating) {
      case 1:
        await getCourse.update({ rating1: getCourse.rating1 + 1 });
        break;
      case 2:
        await getCourse.update({ rating2: getCourse.rating2 + 1 });
        break;
      case 3:
        await getCourse.update({ rating3: getCourse.rating3 + 1 });
        break;
      case 4:
        await getCourse.update({ rating4: getCourse.rating4 + 1 });
        break;
      case 5:
        await getCourse.update({ rating5: getCourse.rating5 + 1 });
        break;
      default:
        return res.status(400).json({
          code: 400,
          status: "Bad Request",
          message: "Wrong Rating",
          success: false,
        });
    }

    // Calculate the new average rating
    const totalRatings =
      getCourse.rating1 +
      getCourse.rating2 +
      getCourse.rating3 +
      getCourse.rating4 +
      getCourse.rating5;
    const averageRating =
      (getCourse.rating1 * 1 +
        getCourse.rating2 * 2 +
        getCourse.rating3 * 3 +
        getCourse.rating4 * 4 +
        getCourse.rating5 * 5) /
      totalRatings;

    // Update the average rating
    await getCourse.update({
      rating: averageRating,
      finished: getCourse.finished + 1,
    });
    // Add the review
    const addReview = await ReviewCourse.create({
      user_id: userId,
      course_id: courseId,
      rating: rating,
      description: description,
    });

    res.status(201).json({
      code: 201,
      status: "Created",
      message: "Review added successfully",
      success: true,
      data: addReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const { size, page } = req.query;
    const getReview = await ReviewCourse.findAndCountAll({
      limit: parseInt(size),
      offset: (page - 1) * size,
      include: {
        model: Users,
        attributes: ["image", "name"],
      },
    });

    if (!getReview.rows.length)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Review Not Found",
        success: false,
      });

    res.json({
      code: 200,
      status: "OK",
      message: "Success Get Data",
      success: true,
      data: getReview.rows, // Return the actual data
      page: {
        size: parseInt(size),
        total: getReview.count,
        page: parseInt(page),
        totalPages: Math.ceil(getReview.count / parseInt(size)),
      },
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
