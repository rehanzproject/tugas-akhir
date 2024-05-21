import Course from "../model/CourseModel.js";
import Modules from "../model/ModulesModel.js";
export const getModule = async (req, res) => {
  try {
    const getCourses = await Course.findOne({
      where: {
        course_id: req.query.id,
      },
      include: [
        {
          model: Modules,
          attributes: ["module_id", "name"],
        },
      ],
    });

    if (!getCourses)
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
      data: getCourses,
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
