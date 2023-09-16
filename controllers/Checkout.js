import Checkout from "../model/CheckoutModel.js";
import Course from "../model/CourseModel.js";

export const getAllCheckout = async (req, res) => {
  try {
    const getCheckout = await Checkout.findAll();
    if (!getCheckout.length)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Checkout Not Found",
        success: false,
      });

    res.status(200).json({
      code: 200,
      status: "Created",
      message: "Get All Checkout Successfully",
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

export const addCheckout = async (req, res) => {
  try {
    const searchUser = await Checkout.findAll({
      where: {
        user_id: req.userId,
        course_id: req.query.id,
        verify: false,
      },
    });
    if (searchUser.length)
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "User Already Checkout",
        success: false,
      });
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
    console.log(error);
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
    const findUserAndCheckout = await Checkout.findOne({
      where: {
        id: req.query.id,
        user_id: req.userId,
      },
    });
    if (!findUserAndCheckout)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Checkout Not Found",
        success: false,
      });
    const addCheckoutVerify = await findUserAndCheckout.update({
      payment_method: req.body.payment_method,
      verify: true,
    });
    res.status(201).json({
      code: 201,
      status: "Created",
      message: "User Checkout Course Successfully",
      success: true,
      data: addCheckoutVerify,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
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
    if (!getCheckout)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "User Not Found",
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
