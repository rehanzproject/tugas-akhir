import Checkout from "../model/CheckoutModel.js";
import CompletionModule from "../model/CompletionModuleModel.js";
import Course from "../model/CourseModel.js";

// todo
// buat query biar bisa nyari Checkout yang udah selesai
// setelah itu

export const getModuleUserCheckout = async (req, res) => {
  try {
    // find checkout who verified
    const findCheckout = await Checkout.findAll({
      where: {
        user_id: req.userId,
        verify: true,
      },
    });
    if (!getCheckout.length)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Checkout Not Found",
        success: false,
      });
    // find Completion Module with user id and course id
    const getModules = await CompletionModule.findAll({
      where: {
        user_id: findCheckout.user_id,
        course_id: findCheckout.course_id,
      },
    });
    if (!getModules.length)
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
      data: getModules,
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
