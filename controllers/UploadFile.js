import multer from "multer";
import path from "path";
import Users from "../model/UserModel.js";
import fs from "fs";
import Course from "../model/CourseModel.js";
import cloudinary from "../utils/cloudinary.js";

const storagePicture = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const storageThumbnail = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const storageDocument = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/documents");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, "document__" + Date.now() + ext);
  },
});

export const uploadDocument = multer({ storage: storageDocument }).single(
  "document"
);
export const upload = multer({ storage: storagePicture });
export const uploadThumbnail = multer({ storage: storageThumbnail });

export const SaveThumbnail = async (req, res) => {
  try {
    const course = await Course.findOne({
      where: {
        course_id: req.query.id,
      },
    });

    if (!course) {
      return res
        .status(404)
        .json({
          error: { code: 404, msg: "Course Not Found" },
          success: false,
        });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "Picture not Found" });
    }

    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: { msg: "Internal Server Error. Try Again" },
          success: false,
        });
      }

      await course.update({
        thumbnail: result.secure_url,
      });
      return res.json({
        msg: "Success Update Picture",
        data: course.thumbnail,
        success: true,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: { msg: "Internal Server Error. Try Again" },
      success: false,
    });
  }
};

export const SavePicture = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.email,
      },
    });
    if (!user)
      return res
        .status(404)
        .json({ error: { code: 404, msg: "User Not Found" }, success: false });

    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          error: { msg: "Internal Server Error. Try Again" },
          success: false,
        });
      }

      await user.update({
        image: result.secure_url,
      });
      return res.json({
        msg: "Success Update Picture",
        data: user.image,
        success: true,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: { msg: "Internal Server Error. Try Again" },
      success: false,
    });
  }
};
export const SaveDocument = async (req, res) => {
  try {
    uploadDocument(req, res, (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Error uploading document" });
      }
      return res.json({ msg: "Success Upload Document", success: true });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
