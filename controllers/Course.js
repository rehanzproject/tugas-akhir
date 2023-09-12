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
      include: {
        model: Modules
      }
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
      page: { size: parseInt(size),total:getCourse.count,  page: parseInt(page), totalPages: Math.ceil(getCourses.count / parseInt(size)) },
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
