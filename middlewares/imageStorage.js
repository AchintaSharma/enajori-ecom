const fs = require("fs");
const path = require("path");
const Product = require("../models/product.model");
// const sharp = require("sharp");
const { convertToSlug } = require("../utils/functions");

const storeImages = async (req, res, next) => {
  // Function to generate a thumbnail image
  // const generateThumbnail = async (inputPath, outputPath) => {
  //   try {
  //     await sharp(inputPath)
  //       .resize(200, 200) // Adjust the width and height as desired for the thumbnail
  //       .toFile(outputPath);
  //     console.log(`Thumbnail ${outputPath} generated successfully.`);
  //   } catch (err) {
  //     console.error(`Error generating thumbnail: ${err}`);
  //   }
  // };

  try {
    const { category, name, images } = req.storeImages;

    // Create the category folder if it doesn't exist
    // Convert category and product name to lowercase and slugify them
    const categorySlug = convertToSlug(category);
    const nameSlug = convertToSlug(name);

    console.log(nameSlug, categorySlug);
    // Create the category folder if it doesn't exist
    const categoryFolderPath = path.join(
      __dirname,
      "../product-images",
      categorySlug
    );
    if (!fs.existsSync(categoryFolderPath)) {
      fs.mkdirSync(categoryFolderPath, { recursive: true });
    }

    // Create the product folder inside the category
    const productFolderPath = path.join(categoryFolderPath, nameSlug);
    if (!fs.existsSync(productFolderPath)) {
      fs.mkdirSync(productFolderPath, { recursive: true });
    }

    // Delete previous images if it's an update
    if (req.method === "PUT") {
      const files = fs.readdirSync(productFolderPath);
      files.forEach((file) => {
        fs.unlinkSync(path.join(productFolderPath, file));
      });
    }

    const saveImage = (dataUrl, index) => {
      const timestamp = Date.now();
      const fileName = `${nameSlug}-${timestamp}.jpg`;
      const filePath = path.join(productFolderPath, fileName);

      const base64Data = dataUrl.replace(
        /^data:image\/(png|jpeg|jpg);base64,/,
        ""
      );

      fs.writeFileSync(filePath, base64Data, "base64");

      // Create thumbnail (assuming you have a function to generate thumbnails)
      // const thumbnailFileName = `${name}_${timestamp}_thumbnail.jpg`;
      // const thumbnailFilePath = path.join(productFolderPath, thumbnailFileName);
      // generateThumbnail(filePath, thumbnailFilePath); // Replace `generateThumbnail` with your thumbnail generation function

      return fileName;
    };

    const productImages = [];

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const fileName = saveImage(image, i);
      productImages.push(`/product-images/${category}/${name}/${fileName}`);
    }

    req.body.images = productImages;

    next();
  } catch (err) {
    console.log("#### Error while storing images ####\n", err.message);
    return res.status(500).send({
      success: false,
      status: 500,
      error: "Internal server error occurred while storing images.",
    });
  }
};

module.exports = {
  storeImages,
};
