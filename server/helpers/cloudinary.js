const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dil0jedri",
  api_key: "541813453282964",
  api_secret: "KGj8MwtBk4s_GYCfAQzk5JD0vA0",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}
const upload = multer({ storage });

module.exports = { upload, imageUploadUtil };