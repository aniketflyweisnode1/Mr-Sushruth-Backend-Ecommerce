const router = require("express").Router();
const { isAuthenticatedUser } = require("../Middleware/auth");
const {
    createAddress,
    getAddress,
    // updateAboutUs,
    // deleteAboutUs,
} = require("../Controller/addressCtrl");

router.post("/",isAuthenticatedUser, createAddress);
// router.get("/", getAboutUs);
// router.put("/:id", updateAboutUs);
// router.delete("/:id", deleteAboutUs);
module.exports = router;
