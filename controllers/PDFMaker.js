import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import Users from "../model/UserModel.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const ShowPDF = async (req, res) => {
  try {
    // Load the PDF template
    const getUser = await Users.findOne({
      where: {
        user_id: req.userId,
      },
    });
    if (!getUser) return res.status(404).json({ msg: "User Not Found!" });
    const existingPdfBytes = await fs.promises.readFile(
      "template/pdf/template.pdf",
    ); // Replace with your input PDF file path

    // Load the PDF using pdf-lib
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Access the first page
    const [page] = pdfDoc.getPages();

    // Define the text to add and its properties
    const text = getUser?.name.toUpperCase();
    const fontSize = 20;
    const font = await pdfDoc.embedFont("Helvetica");
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    // Calculate the x-coordinate to center the text
    const pageWidth = page.getSize().width;
    const centerX = (pageWidth - textWidth) / 2;

    const y = 600;

    // Add the text to the page
    page.drawText(text, {
      x: centerX,
      y,
      size: fontSize,
      color: rgb(0, 0, 0), // Black color
    });

    // Serialize the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();

    // Write the modified PDF to a new file
    await fs.promises.writeFile(
      `template/output/${getUser.name}-${uuidv4()}.pdf`,
      modifiedPdfBytes,
    );
    res.status(201).json({ msg: "PDF has been modified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error generating PDF");
  }
};
