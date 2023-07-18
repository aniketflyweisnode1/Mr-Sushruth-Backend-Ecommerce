const User = require("../Model/userModel");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
require("dotenv").config();
const jwt = require('jsonwebtoken')
const OTP = require("../utils/OTP-Generate")
const token = require("../utils/Token")
const Wallet = require("../Model/myWalletModel");

//////////////////////////////// REGISTER USER WITH GOOGLE //////////////////////////////////

// exports.signInWithGoogle = catchAsyncErrors(async (req, res, next) => {
//   const googleClient = new OAuth2Client({
//     clientId: `${process.env.GOOGLE_CLIENT_ID}`,
//   });

//   const { token } = req.body;

//   const ticket = googleClient.verifyIdToken({
//     idToken: token,
//     audience: `${process.env.GOOGLE_CLIENT_ID}`,
//   });

//   const payload = ticket.getPayload();

//   const user = await User.findOne({ email: payload?.email });

//   if (!user) {
//     const newUser = await User.create({
//       name: payload?.name,
//       email: payload?.email,
//     });
//     sendToken(newUser, 200, res);
//   }
//   sendToken(user, 201, res);
// });


//////////////////////////////// REGISTER USER MOBILE NO. //////////////////////////////////

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { phone } = req.body;
  try {
    let findUser = await User.findOne({ phone, role: "User" });
    if (findUser) {
      return res.status(409).json({ data: {}, message: "Already exit.", status: 409, });
    } else {
      const otp = OTP.generateOTP();
      const user = await User.create({ phone, otp, });
      if (user) {
        return res.status(201).json({ data: user, message: "Registration susscessfully", status: 200, });
      }
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  next();
});
exports.UpdatePhoneUser = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const phone = req.body.phone;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    user.phone = phone;
    await user.save();

    // Generate and send OTP
    const otp = OTP.generateOTP();
    // const message = `Your OTP for updating phone number is ${otp}`;
    // await SMS.send(phone, message);

    res.status(200).json({
      data: user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
      message: "Something went wrong. Please try again",
    });
  }
});
exports.registerEmailUser = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const email = req.body.email;
  const name = req.body.name;
  const gender = req.body.gender;

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser && existingUser.id !== id) {
    return res.status(409).json({
      error: "Email already exists",
    });
  }

  user.email = email;
  user.name = name;
  user.gender = gender;

  // Update user's last updated date
  user.updatedAt = new Date();

  await user.save();

  res.status(200).json({
    data: user,
    success: true,
  });
});
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { phone } = req.body;

  if (!phone) {
    return next(new ErrorHander("Please Your Phone No.", 400));
  }

  const user = await User.findOne({ phone, role: "User" })
  if (!user) {
    return next(new ErrorHander("Invalid phone Number", 401));
  }

  if (user) {
    // const otp = await sendOtp(user, "account_verification");

    const otp = await OTP.generateOTP()
    let update = await User.findByIdAndUpdate({ _id: user._id }, { $set: { otp: otp } }, { new: true })
    return res.status(201).json({ success: true, Id: update._id, otp: otp })
  }

  sendToken(user, 200, res);
});
exports.verifyOTP = catchAsyncErrors(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if OTP is valid
    const isOTPValid = user.otp === req.body.otp;
    if (!isOTPValid) {
      return res.status(400).send({ message: "Invalid OTP" });
    }


    // Generate JWT token
    const Token = token.generateJwtToken(user._id);

    // Update user's OTP status
    user.otp = null;
    user.phoneVerified = true;
    await user.save();

    return res.status(200).send({
      message: "OTP verified successfully",
      Token,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
exports.resendOTP = catchAsyncErrors(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Generate new OTP
    const otp = OTP.generateOTP();

    // Update user's OTP
    user.otp = otp;
    await user.save();

    // Send OTP
    // const message = `Your OTP is ${otp}`;
    // await sendOTP(user.phone, message);

    return res.status(200).send({ message: "OTP resent successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
