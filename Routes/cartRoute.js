const { addToCart, getCart, updateQuantity, applyCoupon } = require("../Controller/cartCtrl");
const { isAuthenticatedUser } = require("../Middleware/auth");

const router = require("express").Router();

router.post("/:id", isAuthenticatedUser, addToCart);
router.put("/:id", isAuthenticatedUser, updateQuantity);
router.get("/getCart", isAuthenticatedUser, getCart);
router.put("/coupon", applyCoupon);

module.exports = router;  