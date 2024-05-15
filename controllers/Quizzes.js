import { json } from "sequelize";
import Modules from "../model/ModulesModel.js";
import Quizzes from "../model/QuizzesModel.js";

export const addQuizzes = async (req, res) => {
    try {
        
      const findQuiz = await Modules.findOne({
        where: {
          module_id: req.query.id
        },
      });
      if (!findQuiz)
        return res.status(404).json({
          code: 404,
          status: "Not Found",
          message: "Module Not Found",
          success: false,
        });
        const newQuizzes = await Quizzes.create({
            data: req.body, 
            module_id: req.query.id
        });
      res.status(201).json({
        code: 201,
        status: "Created",
        message: "Create Quiz Successfully",
        success: true,
        data: newQuizzes,
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

  export const getQuiz = async (req, res) => {
    try {
      const findQuiz = await Quizzes.findAll({
        where: {
          module_id: req.query.id
        },
      });
      if (!findQuiz)
        return res.status(404).json({
          code: 404,
          status: "Not Found",
          message: "Module Not Found",
          success: false,
        });
    
      res.status(200).json({
        code: 200,
        status: "OK",
        message: "find Quiz Successfully",
        success: true,
        data: findQuiz,
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