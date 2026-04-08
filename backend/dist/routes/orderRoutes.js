"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route("/")
    .post(authMiddleware_1.protect, authMiddleware_1.customerOnly, orderController_1.createOrder)
    .get(authMiddleware_1.protect, authMiddleware_1.adminOnly, orderController_1.getAllOrders);
router.get("/myorders", authMiddleware_1.protect, orderController_1.getUserOrders);
router.get("/incoming", authMiddleware_1.protect, orderController_1.getIncomingOrders);
router.get("/pharmacy/:pharmacyId", authMiddleware_1.protect, orderController_1.getPharmacyOrders);
router.put("/:id/status", authMiddleware_1.protect, orderController_1.updateOrderStatus);
exports.default = router;
