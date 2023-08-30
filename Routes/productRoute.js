const express = require("express");
const {
  searchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  createWishlist,
  removeFromWishlist,
  myWishlist,
  getProductByCategory
} = require("../Controller/ProductCtrl");
const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images/image",
    allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"],
  },
});
const upload = multer({ storage: storage });
const router = express.Router();

router.get("/search", searchAllProducts);

router.get("/by/category/:id", authorizeRoles("Admin"), getProductByCategory);
router.post("/add/wishlist/:id", isAuthenticatedUser, createWishlist);
router.put("/remove/wishlist/:id", isAuthenticatedUser, removeFromWishlist);
router.get("/wishlist/me", isAuthenticatedUser, myWishlist);

router.get("/admin/products", getAdminProducts);

router.post("/admin/product/new", upload.array("image"), createProduct);

router.put("/admin/product/:id", isAuthenticatedUser, updateProduct)
router.delete("/admin/product/:id", isAuthenticatedUser, deleteProduct);

router.get("/:id", getProductDetails);

router.put("/review", /* isAuthenticatedUser, */ createProductReview);

router.get("/reviews", getProductReviews)
router.delete("/reviews", isAuthenticatedUser, deleteReview);

module.exports = router;

