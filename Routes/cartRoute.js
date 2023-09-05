const { addToCart, getCart, updateQuantity, applyCoupon,deletProduct ,decreaseQty} = require("../Controller/cartCtrl");
const { isAuthenticatedUser } = require("../Middleware/auth");

const router = require("express").Router();

router.post("/:id", isAuthenticatedUser, addToCart);
router.put("/:id", isAuthenticatedUser, updateQuantity);
router.get("/", isAuthenticatedUser, getCart);
router.put("/coupon", applyCoupon);
router.put("/decrease/:productId", isAuthenticatedUser,decreaseQty);

router.delete("/delete/:productId", isAuthenticatedUser,deletProduct);


module.exports = router;  