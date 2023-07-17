const admin = require("../Controller/adminCtrl");
const router = require("express").Router();
router.post("/registerAdmin", admin.RegisterAdmin);
router.post("/signin", admin.signin);
router.get("/user", admin.getAllUser);
router.get("/:id", admin.getUserbyId);
router.delete("/:id", admin.deleteUser);

module.exports = router;