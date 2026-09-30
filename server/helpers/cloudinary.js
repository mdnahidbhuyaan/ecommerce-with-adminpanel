const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "mediaflows_4822ca92-5a3c-46a2-a777-612ac13da361",
  api_key: "432179998841288",
  api_secret: "*********************************",
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