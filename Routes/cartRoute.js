const { addToCart, getCart, updateQuantity, applyCoupon,deletProduct } = require("../Controller/cartCtrl");
const { isAuthenticatedUser } = require("../Middleware/auth");

const router = require("express").Router();

router.post("/:id", isAuthenticatedUser, addToCart);
router.put("/:id", isAuthenticatedUser, updateQuantity);
router.get("/", isAuthenticatedUser, getCart);
router.put("/coupon", applyCoupon);

router.delete("/delete/:productId", isAuthenticatedUser,deletProduct);


module.exports = router;  