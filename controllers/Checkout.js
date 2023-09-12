import Checkout from "../model/CheckoutModel.js";

export const getCheckout = async (req, res) => {
  try {
    const getCheckout = await Checkout.findAll({
      where: {
        course_id: req.query.id,
      },
    });
    if (!getCheckout)
      return res.status(404).json({ msg: "Checkout Not Found!" });
    await Checkout.create({
      course_id: req.query.id,
      user_id: req.userId,
    });
    res.status(200).json({ msg: "Get Checkout Success", data: getCheckout });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getCheckoutVerify = async (req, res) => {
  try {
    const getCheckout = await Checkout.findAll({
      where: {
        user_id: req.query.id,
      },
    });
    if (!getCheckout)
      return res.status(404).json({ msg: "Checkout Not Found!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getCheckoutUser = async (req, res) => {
  try {
    const getCheckout = await Checkout.findOne({
      where: {
        email: req.email
      },
    });
    if (!getCheckout)
    return res.status(404).json({code:404 ,status: "Not Found",message:"User Not Found", success: false});
  } catch (error) {
    console.log(error);
    res.status(500).json({code:500 ,status: "Internal Server Error",message:"Internal Server Error", errors: { error }});
  }
};
