"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getPharmacyOrders = exports.getAllOrders = exports.getUserOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Medicine_1 = __importDefault(require("../models/Medicine"));
const Pharmacy_1 = __importDefault(require("../models/Pharmacy"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pharmacyId, items, totalAmount, prescriptionUrl } = req.body;
        if (!items || items.length === 0) {
            res.status(400).json({ message: "No order items" });
            return;
        }
        // 1. Check stock availability for all items
        for (const item of items) {
            const medicine = yield Medicine_1.default.findById(item.medicineId);
            if (!medicine) {
                res.status(404).json({ message: `Medicine not found: ${item.name}` });
                return;
            }
            if (medicine.stockQuantity < item.quantity) {
                res.status(400).json({ message: `Insufficient stock for ${medicine.name}. Available: ${medicine.stockQuantity}` });
                return;
            }
        }
        // 2. Reduce stock and create order
        const order = new Order_1.default({
            userId: req.user._id,
            pharmacyId,
            items,
            totalAmount,
            prescriptionUrl,
            status: "PENDING"
        });
        const createdOrder = yield order.save();
        // Deduct from stock
        for (const item of items) {
            yield Medicine_1.default.findByIdAndUpdate(item.medicineId, {
                $inc: { stockQuantity: -item.quantity }
            });
        }
        res.status(201).json(createdOrder);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.createOrder = createOrder;
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find({ userId: req.user._id })
            .populate("pharmacyId", "name address")
            .sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.getUserOrders = getUserOrders;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find({})
            .populate("userId", "name email")
            .populate("pharmacyId", "name")
            .sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.getAllOrders = getAllOrders;
const getPharmacyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find({ pharmacyId: req.params.pharmacyId })
            .populate("userId", "name email phone")
            .sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.getPharmacyOrders = getPharmacyOrders;
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.findById(req.params.id);
        if (!order)
            return res.status(404).json({ message: "Order not found" });
        // Allow if ADMIN or if user is the PHARMACY_OWNER of this pharmacy
        if (req.user.role !== "ADMIN") {
            const pharmacy = yield Pharmacy_1.default.findById(order.pharmacyId);
            if (!pharmacy || pharmacy.ownerId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: "Not authorized to update this order" });
            }
        }
        order.status = req.body.status;
        yield order.save();
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
});
exports.updateOrderStatus = updateOrderStatus;
