import { Op } from "sequelize";
import Checkout from "../model/CheckoutModel.js";
import Course from "../model/CourseModel.js";
import CompletionCourse from "../model/CompletionCourseModel.js";

export const getStats = async (req, res) => {
  try {
    const course = await Course.count();
    const student = await Course.sum("member_count");
    const graduate = await CompletionCourse.findAll()

    if (!course) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Modules Not Found",
        success: false,
      });
    }

    const data = {
      course,
      student,
      graduate : graduate.length,
    };

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Get Stats Successfully",
      success: true,
      data: data,
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

export const getInfo = async (req, res) => {
  try {
    const student = await Course.sum("member_count");

    // Retrieve the total number of finished courses
    const graduate = await CompletionCourse.findAll()
    // Retrieve the total number of verified checkouts
    const verifiedCheckouts = await Checkout.count({ where: { verify: true } });
    const check = await Checkout.findAll({
      where: { verify: true },
      include: { model: Course },
    });
    const totalPrice = check.reduce(
      (sum, val) => sum + (val.course.price || 0),
      0
    );
    const data = {
      student,
     graduate: graduate.length,
      verifiedCheckouts,
      income: totalPrice,
    };

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Get Stats Successfully",
      success: true,
      data: data,
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
