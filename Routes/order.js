const router = require("express").Router();

const { isAuthenticatedUser, authorizeRoles } = require("../Middleware/auth");
const { placeOrderCOD, getOrders, getSingleOrder,getUnconfirmedOrders, GetAllReturnOrderbyUserId, GetReturnByOrderId, orderReturn, updateOrder, getAllOrders, checkout, placeOrder, myOrders } = require("../Controller/Order");

router.post("/checkout", isAuthenticatedUser, checkout);
router.post("/place-order", isAuthenticatedUser, placeOrder);
router.post('/place-order/cod', isAuthenticatedUser, placeOrderCOD)
router.get("/Allorders", isAuthenticatedUser, getOrders)

// router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.get("/:id", getSingleOrder);

//Return Router 
router.post('/return/:id', orderReturn);
router.get('/return/:userId', GetAllReturnOrderbyUserId)
router.get('/return/orderId/:id', GetReturnByOrderId);
router.get("/", isAuthenticatedUser, myOrders);


router.put("/admin/:id", updateOrder)
//   .delete(  deleteOrder);
router.get("/admin/orders", getAllOrders);
router.get("/all/user/orders", getUnconfirmedOrders);

module.exports = router;



