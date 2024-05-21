import Checkout from "../model/CheckoutModel.js";
import CompletionModule from "../model/CompletionModuleModel.js";
import Course from "../model/CourseModel.js";

// todo
// buat query biar bisa nyari Checkout yang udah selesai
// setelah itu
export const getModuleUserCheckout = async (req, res) => {
  try {
    // find checkout who verified
    const findCheckouts = await Checkout.findAll({
      where: {
        user_id: req.userId,
        verify: true,
      },
      include: {
        model: Course,
        attributes: ["course_id", "name", "thumbnail"],
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

    // Retrieve all Completion Modules related to the user's checkouts
    const checkoutCourseIds = findCheckouts.map(
      (checkout) => checkout.course_id
    );

    const getModules = await CompletionModule.findAll({
      where: {
        user_id: req.userId,
        course_id: checkoutCourseIds,
      },
    });

    if (!getModules.length) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Completion Modules Not Found",
        success: false,
      });
    }

    // Filter modules that do not have a score
    const modulesWithoutScore = getModules.filter(
      (module) => module.score === null
    );

    res.json({
      code: 200,
      status: "OK",
      message: "Success Get Data",
      success: true,
      data: {
        course: findCheckouts,
        modules: getModules,
        modulesWithoutScore: modulesWithoutScore,
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
