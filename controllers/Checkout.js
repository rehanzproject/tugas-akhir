import { Op, where } from "sequelize";
import Checkout from "../model/CheckoutModel.js";
import CompletionModule from "../model/CompletionModuleModel.js";
import Course from "../model/CourseModel.js";

export const getAllCheckout = async (req, res) => {
  try {
    const { size, page } = req.query;
    const getCheckoutAll = await Checkout.findAndCountAll({
      limit: parseInt(size),
      offset: (page - 1) * size,
      include: {
        model: Course,
        attributes: ["name", "price"],
      },
    });

    if (!getCheckoutAll.rows.length)
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
      data: getCheckoutAll.rows,
      page: {
        size: parseInt(size),
        total: getCheckoutAll.count,
        page: parseInt(page),
        totalPages: Math.ceil(getCheckoutAll.count / parseInt(size)),
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
export const addCheckout = async (req, res) => {
  try {
    const searchUser = await Checkout.findOne({
      where: {
        user_id: req.userId,
        course_id: req.query.id,
        [Op.or]: [{ verify: false }, { verify: null }],
      },
    });

    if (searchUser) {
      return res.status(200).json({
        code: 200,
        status: "OK",
        message: "User Checkout Successfully",
        success: true,
        data: searchUser,
      });
    }
    const searchCourseVerify = await Checkout.findOne({
      where: {
        user_id: req.userId,
        course_id: req.query.id,
        verify: true,
      },
    });
    if (searchCourseVerify) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "You've already Checkout",
        success: true,
        data: searchUser,
      });
    }
    const createCheckout = await Checkout.create({
      course_id: req.query.id,
      user_id: req.userId,
    });

    res.status(201).json({
      code: 201,
      status: "Created",
      message: "User Checkout Successfully",
      success: true,
      data: createCheckout,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: "Internal Server Error",
      errors: { error },
    });
  }
};

export const getCheckoutVerify = async (req, res) => {
  try {
    const { payment_method } = req.query;
    // Find the checkout record for the user
    if (!payment_method) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Payment Method Not Found",
        success: false,
      });
    }
    const findUserAndCheckout = await Checkout.findOne({
      where: {
        id: req.query.id,
        user_id: req.userId,
      },
    });

    if (!findUserAndCheckout) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Checkout Not Found",
        success: false,
      });
    }

    // Update the checkout record with the payment method and verify status
    const addCheckoutVerify = await findUserAndCheckout.update({
      payment_method,
      verify: true,
    });

    // Increment the user count and member count for the course
    await Course.increment(["user_count", "member_count"], {
      by: 1,
      where: {
        course_id: findUserAndCheckout.course_id,
      },
    });

    res.status(201).json({
      code: 201,
      status: "Created",
      message: "Verify Checkout Course Successfully",
      success: true,
      data: {
        addCheckoutVerify,
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

export const getCheckoutUser = async (req, res) => {
  try {
    const getCheckout = await Checkout.findAll({
      where: {
        user_id: req.userId,
        verify: true,
      },
      include: {
        model: Course,
        attributes: ["name", "price"],
      },
    });
    if (!getCheckout.length)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Checkout Not Found",
        success: false,
      });
    res.json({
      code: 200,
      status: "OK",
      message: "Success Get Data",
      success: true,
      data: getCheckout,
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

export const getCheckoutByUser = async (req, res) => {
  try {
    const getCheckout = await Checkout.findAll({
      where: {
        user_id: req.userId,
      },
      include: {
        model: Course,
        attributes: ["name", "price"],
      },
    });
    if (!getCheckout.length)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Checkout Not Found",
        success: false,
      });
    res.json({
      code: 200,
      status: "OK",
      message: "Success Get Data",
      success: true,
      data: getCheckout,
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
