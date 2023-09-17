import Assignment from "../model/AssignmentModel.js";
import { uploadDocument } from "./UploadFile.js";

export const addAssignmentUser = async (req, res) => {
  try {
    uploadDocument(req, res, async (err) => {
      if (err) {
        console.log(err);
        res
          .status(400)
          .json({
            code: 400,
            status: "Bad Request",
            message: "Error Uploading Document",
            success: false,
          });
      }
      const checkAssignment = await Assignment.findOne({
        where: {
          user_id: req.userId,
          course_id: req.query.id,
        },
      });
      if (!checkAssignment)
        return res.status(404).json({
          code: 404,
          status: "Not Found",
          message: "User & Course Not Found",
          success: false,
        });
      await checkAssignment.update({
        document: `http://localhost:5000/document/${req.file.filename}`,
      });

      res.json({
        code: 200,
        status: "OK",
        message: "Success Send Document",
        success: true,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
