const userCtrl = require("../Controller/userCtrl");
const router = require("express").Router();
router.post("/create", userCtrl.registerUser);
router.put("/email/:id", userCtrl.registerEmailUser);
router.put("/mobile/:id", userCtrl.UpdatePhoneUser);
router.post("/login", userCtrl.loginUser);
router.post("/verify-otp/:id", userCtrl.verifyOTP);
module.exports = router;