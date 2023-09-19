const Banner = require('../Model/bannerModel')
require('dotenv').config();

const imagePattern = "[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$";
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: 'dtijhcmaa', 
    api_key: '624644714628939', 
    api_secret: 'tU52wM1-XoaFD2NrHbPrkiVKZvY' 
  });
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images/image",
    allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"],
  },
});

const upload = multer({ storage: storage });
exports.AddBanner = async (req, res) => {
  try {
    let findBanner = await Banner.findOne({ name: req.params.name });
    console.log(req.params.name)
    if (findBanner) {
      res.status(409).json({ message: "Banner already exit.", status: 404, data: {} });
    } else {
      upload.single("image")(req, res, async (err) => {
        if (err) { return res.status(400).json({ msg: err.message }); }
        // console.log(req.file);
        const fileUrl = req.file ? req.file.path : "";
        const data = { name: req.params.name, image: fileUrl };
        const banner = await Banner.create(data);
        res.status(200).json({ message: "Banner add successfully.", status: 200, data: banner });
      })
    }

  } catch (error) {
    res.status(500).json({ status: 500, message: "internal server error ", data: error.message, });
  }
};

exports.getBanner = async (req, res) => {
    try {
        const Banners = await Banner.find();
        res.status(200).json({
            message: "All Banners",
            data: Banners
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.getById = async (req, res) => {
    try {
        const Banners = await Banner.findById({ _id: req.params.id });
        res.status(200).json({
            message: "One Banners",
            // data: Banner
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err.message
        })
    }
}

exports.DeleteBanner = async(req,res) => {
    try{
        const Banners = await Banner.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({
            message: "Delete Banner ",
        },)
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}