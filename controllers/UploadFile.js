import multer from "multer";
import path from "path";
import Users from "../model/UserModel.js";
import fs from "fs";
import Course from "../model/CourseModel.js";
const storagePicture = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, "user__" + Date.now() + ext);
  },
});
const storageThumbnail = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/thumbnail");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, "thumbnail__" + Date.now() + ext);
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
  "document",
);
export const upload = multer({ storage: storagePicture })
export const uploadThumbnail = multer({ storage: storageThumbnail })

export const SaveThumbnail = async (req, res) => {
  try {
    const course = await Course.findOne({
      where: {
        course_id: req.query.id,
      },
    });
    if (!course)
      return res
        .status(404)
        .json({ error: { code: 404, msg: "User Not Found" }, success: false });
    if (course.image) {
      const imageName = path.basename(course.image);
      const imagePath = path.join("public/thumbnail", imageName);
      await fs.promises.unlink(imagePath);
    }
    console.log(req.file);
    if (!req.file) return res.status(400).json({ msg: "Picture not Found" });
    const updatedData = await course.update({
      thumbnail: `http://localhost:5000/thumbnail/${req.file.filename}`,
    });
    return res.json({
      msg: "Success Update Picture",
      data: updatedData.image,
      success: true,
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
    if (user.image) {
      const imageName = path.basename(user.image);
      const imagePath = path.join("public/images", imageName);
      await fs.promises.unlink(imagePath);
    }
    if (!req.file) return res.status(400).json({ msg: "Picture not Found" });
    const updatedData = await user.update({
      image: `http://localhost:5000/images/${req.file.filename}`,
    });
    return res.json({
      msg: "Success Update Picture",
      data: updatedData.image,
      success: true,
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
