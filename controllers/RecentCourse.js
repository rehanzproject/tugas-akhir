import { Op, Sequelize } from "sequelize";
import Checkout from "../model/CheckoutModel.js";
import Course from "../model/CourseModel.js";
import Modules from "../model/ModulesModel.js";
import CompletionModule from "../model/CompletionModuleModel.js";
import Users from "../model/UserModel.js";
import RecentCourse from "../model/RecentCourseModel.js";

export const AddRecentCourse = async (req, res) => {
  try {
    const findNameCourse = await RecentCourse.findAll({
      where: {
        user_id: req.userId,
        course_id: req.query.id,
      },
    });
    if (findNameCourse.length)
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Name already exist",
        success: false,
      });
    const newRecentCourse = await RecentCourse.create({
      user_id: req.userId,
      course_id: req.query.id,
    });
    res.status(201).json({
      code: 201,
      status: "Created",
      message: "Create Recent Course Successfully",
      success: true,
      data: newRecentCourse,
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

export const getRecentNameCourse = async (req, res) => {
  try {
    const findNameCourse = await RecentCourse.findAll({
      where: {
        user_id: req.userId,
        course_id: req.query.id,
      },
      include: {
        model: Course,
        attributes: ["name"],
      },
    });
    if (!findNameCourse.length)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Recent Course not Found",
        success: false,
      });

    res.status(201).json({
      code: 201,
      status: "Created",
      message: "Create Recent Course Successfully",
      success: true,
      data: findNameCourse,
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

export const getRecentCourse = async (req, res) => {
    try {
      const findNameCourse = await RecentCourse.findAll({
        where: {
          user_id: req.userId,
        },
        include: {
          model: Course,
        },
      });
      if (!findNameCourse.length)
        return res.status(404).json({
          code: 404,
          status: "Not Found",
          message: "Recent Course not Found",
          success: false,
        });
  
      res.status(201).json({
        code: 201,
        status: "Created",
        message: "Create Recent Course Successfully",
        success: true,
        data: findNameCourse,
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
  