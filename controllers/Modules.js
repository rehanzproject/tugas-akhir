import Course from "../model/CourseModel.js";
import Modules from "../model/ModulesModel.js";

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

export const addModule = async (req, res) => {
  try {
    const { name, desc } = req.body;
    const getModule = await Course.findAll({
      where: {
        course_id: req.query.id,
      },
    });
    if (!getModule.length)
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Module has existed",
        success: false,
      });
    const createModule = await Modules.create({
      course_id: req.query.id,
      name: name,
      desc: desc,
    });
    res.status(201).json({
      code: 201,
      status: "Created",
      message: "Add Module Successfully",
      success: true,
      data: createModule,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};
