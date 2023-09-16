import Comment from "../model/CommentModel.js";
import Course from "../model/CourseModel.js";
import ReplyComment from "../model/ReplyCommentModel.js";
// todo
// find course , if not found return not found
// create text and add course + user
// todo 2
// find id comment
// if not , return not found
// text
export const AddComment = async (req, res) => {
  try {
    const { text } = req.body;
    const findCourse = await Course.findAll({
      where: {
        course_id: req.query.id,
      },
    });
    if (!findCourse.length)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Course Not Found",
        success: false,
      });
    const newComment = await Comment.create({
      text: text,
      user_id: req.userId,
      course_id: req.query.id,
    });
    res.status(201).json({
      code: 201,
      status: "Created",
      message: "Create Comment Successfully",
      success: true,
      data: newComment,
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

export const AddReplyComment = async (req, res) => {
  try {
    const { text } = req.body;
    const findComment = await Comment.findAll({
      where: {
        comment_id: req.query.id,
      },
    });
    if (!findComment.length)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Comment Not Found",
        success: false,
      });
    const newReplyComment = await ReplyComment.create({
      text: text,
      user_id: req.userId,
      comment_id: req.query.id,
    });
    res.status(201).json({
      code: 201,
      status: "Created",
      message: "Create Comment Successfully",
      success: true,
      data: newReplyComment,
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

export const GetCommentByCourseID = async (req, res) => {
  try {
    const findComment = await Comment.findAll({
      where: {
        course_id: req.query.id,
      },
      include: {
        model: ReplyComment,
      },
    });
    if (!findComment.length)
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "Comment Not Found",
        success: false,
      });

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "Get Comment by Course Successfully",
      success: true,
      data: findComment,
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
