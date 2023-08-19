const {
  createCategory,
  updateCategory,
  getCategory,
  getallCategory,
  deleteCategory,
  removeCategory,
  createSubCategory,
  lengthCategory
} = require("../Controller/categoryCtrl");
const { authorizeRoles } = require("../Middleware/auth");



const router = require("express").Router();

router.post("/create", authorizeRoles("admin"), createCategory);
router.put("/update/:id", authorizeRoles("admin"), updateCategory);
router.get("/new/:id", /* authorizeRoles("admin"), */ getCategory);
router.get("/", /* authorizeRoles("admin"), */ getallCategory);
router.delete("/delete/:id", authorizeRoles("admin"), deleteCategory);
router.delete("/delete/:id", authorizeRoles("admin"), removeCategory);
router.post("/subcategory", authorizeRoles("admin"), createSubCategory);
router.get("/total-categories", lengthCategory);


module.exports = router;  