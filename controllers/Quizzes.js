import CompletionModule from "../model/CompletionModuleModel.js";
import Modules from "../model/ModulesModel.js";
import Quizzes from "../model/QuizzesModel.js";

export const getQuizzes = async (req, res) => {
  try {
    const findQuiz = await Quizzes.findOne({
      where: {
        module_id: req.query.id,
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
      message: "Get Quiz Successfully",
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
export const addQuizzes = async (req, res) => {
  try {
    const findQuiz = await Modules.findOne({
      where: {
        module_id: req.query.id,
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
      module_id: req.query.id,
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
export const updateQuizzes = async (req, res) => {
  try {
    const findQuiz = await Quizzes.findOne({
      where: {
        module_id: req.query.id,
      },
    });
    if (!findQuiz)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Quizzes Not Found",
        success: false,
      });
    const updatedQuizzes = await findQuiz.update({
      data: req.body,
    });
    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Update Quiz Successfully",
      success: true,
      data: updatedQuizzes,
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

export const deleteQuizzes = async (req, res) => {
  try {
    const findQuiz = await Quizzes.findOne({
      where: {
        module_id: req.query.id,
      },
    });
    if (!findQuiz)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Quizzes Not Found",
        success: false,
      });
    const deletedQuizzes = await findQuiz.destroy();
    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Deleted Quiz Successfully",
      success: true,
      data: deletedQuizzes,
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
    const findQuiz = await Quizzes.findOne({
      where: {
        module_id: req.query.id,
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
export const addOrUpdateScoreQuiz = async (req, res) => {
  try {
    const {course_id, id, score } = req.query;

    // Validate input parameters
    if (!id || !score) {
      return res.status(400).json({
        code: 400,
        status: "Bad Request",
        message: "Missing module_id or score in query parameters",
        success: false,
      });
    }

    // Check if the module already exists
    let addScoreQuiz = await CompletionModule.findOne({
      where: {
        module_id: id,
      },
    });

    if (addScoreQuiz) {
      // Update the score if the module exists
      addScoreQuiz.score = score;
      await addScoreQuiz.save();
    } else {
      // Create a new entry if the module doesn't exist
      addScoreQuiz = await CompletionModule.create({
        user_id : req.userId,
        module_id: id,
        course_id: course_id,
        score: score,
      });
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Score added/updated successfully",
      success: true,
      data: addScoreQuiz,
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
