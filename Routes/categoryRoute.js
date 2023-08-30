const {
  createCategory,
  updateCategory,
  getCategory,
  getallCategory,
  deleteCategory,
  removeCategory,
  createSubCategory,
  lengthCategory,
  getSubcategory,
  getSubcategorybyId
} = require("../Controller/categoryCtrl");
const { authorizeRoles } = require("../Middleware/auth");



const router = require("express").Router();

router.post("/create",  createCategory);
router.put("/update/:id", authorizeRoles("admin"), updateCategory);
router.get("/new/:id", /* authorizeRoles("admin"), */ getCategory);
router.get("/", /* authorizeRoles("admin"), */ getallCategory);
router.delete("/delete/:id", authorizeRoles("admin"), deleteCategory);
router.delete("/delete/:id", authorizeRoles("admin"), removeCategory);
router.post("/subcategory",  createSubCategory);
router.get("/total-categories", lengthCategory);

router.get("/subcategory/get",  getSubcategory);
router.get("/subcategoryId/:categoryId",  getSubcategorybyId);

module.exports = router;  