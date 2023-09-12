import Course from "../model/CourseModel.js";

export const getModules = async (req, res) => {
  try {
    const getModule = await Course.findAll({
      where: {
        course_id: req.query.id,
      },
    });
    if (!getModule) return res.status(404).json({ msg: "Module Not Found!" });
    res.status(200).json({ msg: "Success Get Modules", data: getModule });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};
