import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import Users from "../model/UserModel.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import CompletionCourse from "../model/CompletionCourseModel.js";
import Course from "../model/CourseModel.js";

export const ShowPDF = async (req, res) => {
  try {
  
    // Load the user and course data
    const getUser = await CompletionCourse.findOne({
      where: {
        course_id: req.query.id,
        user_id: req.userId,
      },
      include: [
        {
          model: Users,
          attributes: ["name"],
        },
        {
          model: Course,
          attributes: ["name"],
        },
      ],
    });
    
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getUTCDate();
      const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
      ];
      const month = monthNames[date.getUTCMonth()]; // Months are 0-based
      const year = date.getUTCFullYear();
    
      return `${day} ${month} ${year}`;
    }
    const date = formatDate(getUser?.createdAt)
    if (!getUser) {
      return res.status(404).json({
        code: 404,
        status: "Not Found",
        message: "User Not Found",
        success: false,
      });
    }

    // Load the PDF template
    const existingPdfBytes = await fs.promises.readFile("template/pdf/template.pdf");

    // Load the PDF using pdf-lib
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Register fontkit
    pdfDoc.registerFontkit(fontkit);

    // Embed the custom font
    const fontBytes = await fs.promises.readFile("Avenir.ttf"); // Replace with the path to your Avenir font file
    const customFont = await pdfDoc.embedFont(fontBytes);

    // Access the first page
    const [page] = pdfDoc.getPages();

    // Define the text to add and its properties
    const userName = getUser?.user?.name?.toUpperCase();
    const courseName = getUser?.course?.name;
    const fontSize = 40;
    const fontSizeCourse = 20;
    const textWidth = customFont.widthOfTextAtSize(userName, fontSize);
    const textWidthCourse = customFont.widthOfTextAtSize(courseName, fontSizeCourse);

    // Calculate the x-coordinate to center the text
    const pageWidth = page.getSize().width;
    
    const centerXUser = (pageWidth - textWidth) / 2;
    const centerXCourse = (pageWidth - textWidthCourse) / 2;
    const pageHeight = page.getSize().height;
    const centerY = pageHeight / 2; // Center vertically

    page.drawText(userName, {
      x: centerXUser,
      y: centerY - 20,
      size: fontSize,
      font: customFont,
      color: rgb(5 / 255, 146 / 255, 191 / 255), // Sky Blue, Accent 4 color
    });

    page.drawText(courseName, {
      x: centerXCourse,
      y: centerY - fontSize - 80, // Adjust the Y-coordinate to position the course name below the user name
      size: fontSizeCourse,
      font: customFont,
      color: rgb(1,1,1), 
    });
    
    page.drawText(date, {
      x: centerXCourse + 250,
      y: centerY - fontSize - 145, // Adjust the Y-coordinate to position the course name below the user name
      size: fontSizeCourse - 2,
      font: customFont,
      color: rgb(1,1,1), 
    });

    // Serialize the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();

    // Write the modified PDF to a new file
    await fs.promises.writeFile(
      `template/output/${getUser.user.name}-${uuidv4()}.pdf`,
      modifiedPdfBytes
    );

    res.json({
      code: 200,
      status: "OK",
      message: "Success Generate Certificate",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error generating PDF");
  }
};
