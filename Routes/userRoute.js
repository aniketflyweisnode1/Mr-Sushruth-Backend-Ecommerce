const userCtrl = require("../Controller/userCtrl");
const router = require("express").Router();
const imagePattern = "[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$";
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images/image",
    allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"],
  },
});
const upload = multer({ storage: storage });
router.post("/create", userCtrl.registerUser);
router.put("/email/:id", userCtrl.registerEmailUser);
router.put("/mobile/:id", userCtrl.UpdatePhoneUser);
router.post("/login", userCtrl.loginUser);
router.post("/verify-otp/:id", userCtrl.verifyOTP);
router.route("/signup/verify/:id").put(upload.single('profilePicture'),userCtrl.userPhoto)
module.exports = router;