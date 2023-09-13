import Checkout from "../model/CheckoutModel.js";
import Course from "../model/CourseModel.js";
import Modules from "../model/ModulesModel.js";

export const AddCourse = async (req, res) => {
  try {
    const { name, desc, price, rating } = req.body;
    const newCourse = await Course.create({
      name,
      desc,
      rating,
      price,
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
export const getCourse = async (req, res) => {
  try {
    const { size, page } = req.query;
    const getCourses = await Course.findAndCountAll({
      limit: parseInt(size),
      offset: (page - 1) * size,
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
        verify: true,
        user_id: req.userId,
        course_id: req.query.id,
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
    const getModule = await Course.findOne({
      where: { course_id: req.query.id },
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
