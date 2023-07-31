const {
  createCategory,
  updateCategory,
  getCategory,
  getallCategory,
  deleteCategory,
  removeCategory,
  createSubCategory,
  TotalCategory
} = require("../Controller/categoryCtrl");
const { authorizeRoles } = require("../Middleware/auth");



const router = require("express").Router();

router.post("/create", authorizeRoles("admin"), createCategory);
router.put("/update/:id", authorizeRoles("admin"), updateCategory);
router.get("/:id", /* authorizeRoles("admin"), */ getCategory);
router.get("/", /* authorizeRoles("admin"), */ getallCategory);
router.delete("/delete/:id", authorizeRoles("admin"), deleteCategory);
router.delete("/delete/:id", authorizeRoles("admin"), removeCategory);
router.post("/subcategory", authorizeRoles("admin"), createSubCategory);
router.get("/totalcategory", authorizeRoles("admin"), TotalCategory);


module.exports = router;  