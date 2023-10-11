const Category = require("../Model/categoryModel");
const SubCategory = require("../Model/SubCategoryModel");

const catchAsyncErrors = require("../Middleware/catchAsyncErrors");

///////////
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

const createCategory = async (req, res) => {
  try {
    let findCategory = await Category.findOne({ name: req.body.name });
    console.log(req.body.name)
    if (findCategory) {
      res.status(409).json({ message: "category already exit.", status: 404, data: {} });
    } else {
      upload.single("image")(req, res, async (err) => {
        if (err) { return res.status(400).json({ msg: err.message }); }
        const fileUrl = req.file ? req.file.path : "";
        const data = { name: req.body.name, image: fileUrl };
        const category = await Category.create(data);
        res.status(200).json({ message: "category add successfully.", status: 200, data: category });
      })
    }

  } catch (error) {
    res.status(500).json({ status: 500, message: "internal server error ", data: error.message, });
  }
};
////////////////////////////////////////// UPDATE CATEGORY  //////////////////////////////////

const updateCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) new ErrorHander("Category Not Found !", 400);

  category.name = req.body.name;
  category.image = req.body.image
  await category.save();

  res.status(200).json({ message: "Updated Successfully" });
});

////////////////////////////////////////// DELETE CATEGORY  //////////////////////////////////

const deleteCategory =async (req, res) => {
  const { id } = req.params;
  try {
    const getaCategory = await Category.findById(id);
  // const { id } = req.params;
  // const category = await Category.findById(id);
  // console.log(category);
  // if (!category) {
  //   res.status(404).json({ message: "Category Not Found", status: 404, data: {} });
  // } else {
    const deletedCategory = await Category.findByIdAndDelete(getaCategory);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
};
const deletesubCategory =async (req, res) => {
  const { id } = req.params;
  try {
    const getaCategory = await SubCategory.findById(id);
  // const { id } = req.params;
  // const category = await Category.findById(id);
  // console.log(category);
  // if (!category) {
  //   res.status(404).json({ message: "Category Not Found", status: 404, data: {} });
  // } else {
    const deletedCategory = await SubCategory.findByIdAndDelete(getaCategory);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
};


////////////////////////////////////////// REMOVE CATEGORY  //////////////////////////////////

const removeCategory = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) new ErrorHander("Category Not Found !", 404);

  const subCategory = await SubCategory.find({ parentCategory: id });

  subCategory.map(
    async (item) => await SubCategory.deleteOne({ _id: item.id })
  );

  category.remove();

  res.status(200).json({ message: "Category Deleted Successfully !" });
});

////////////////////////////////////////// GET CATEGORY  //////////////////////////////////

const getCategory = catchAsyncErrors(async (req, res) => {
  console.log("hi");
  const { id } = req.params;
  try {
    const getaCategory = await Category.findById(id);
    res.json(getaCategory);
  } catch (error) {
    throw new Error(error);
  }
});

////////////////////////////////////////// GET ALL CATEGORY  //////////////////////////////////

const getallCategory = catchAsyncErrors(async (req, res) => {
  try {
    const categories = await Category.find();
  res.status(201).json({
    success: true,
    categories,
  });
  } catch (error) {
    throw new Error(error);
  }
});

////////////////////////////////////////// CREATE SUB-CATEGORY  //////////////////////////////////

const createSubCategory = catchAsyncErrors(async (req, res, next) => {
 // const name = req.file ? req.file.filename : null;
  // try {
  //   // req.body.image = `${process.env.IMAGE_BASE_URL}/${req.file.filename}`
  //     const data = {
  //   name: req.body.name, 
  //   image: req.body.image
  // }
  //   console.log(req.body.image);
  // const subCategory = await SubCategory.create(req.body);
  // res.status(201).json({
  //   success: true,
  //   subCategory,
  // });
  // } catch (error) {
  //     console.log(error);
  //     res.status(400).json({
  //     message: error.message
  //   })
  // }
  
    try {
    const { parentCategory, subCategory, image } = req.body;

    // Check if the subcategory already exists
    const existingSubCategory = await SubCategory.findOne({ subCategory });
    if (existingSubCategory) {
      return res.status(400).json({ message: "Subcategory already exists" });
    }

    const newSubCategory = new SubCategory({
      parentCategory,
      subCategory,
      image,
    });

    // Save the new subcategory to the database
    const createdSubCategory = await newSubCategory.save();

    res.status(201).json({
      success: true,
      subCategory: createdSubCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

////////////////////////////////////////// TOTAL CATEGORY  //////////////////////////////////

const lengthCategory = catchAsyncErrors(async (req, res, next) => {
  try {
    const data = await Category.find();
    res.status(200).json({
      total: data.length,
    });
    console.log(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
});

const getSubcategory = catchAsyncErrors(async (req, res, next) => {
try {
  const subcategories = await SubCategory.find().populate("parentCategory");
  res.status(200).json(subcategories);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Error fetching subcategories' });
}
});


const getSubcategorybyId = catchAsyncErrors(async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const subcategories = await SubCategory.find({ parentCategory: categoryId });
    res.status(200).json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching subcategories' });
  }
});

module.exports = {
  getSubcategorybyId,
  createCategory,
  updateCategory,
  removeCategory,
  deleteCategory,
  getCategory,
  getallCategory,
  createSubCategory,
  lengthCategory,
  getSubcategory,
  deletesubCategory
}