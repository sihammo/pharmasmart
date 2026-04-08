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
exports.updateUserRole = exports.updateUserProfile = exports.getUserProfile = exports.getDashboardStats = exports.deleteUser = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const Order_1 = __importDefault(require("../models/Order"));
const Medicine_1 = __importDefault(require("../models/Medicine"));
const Pharmacy_1 = __importDefault(require("../models/Pharmacy"));
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET || "default_dev_secret", {
        expiresIn: "30d",
    });
};
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, phone, role } = req.body;
    try {
        const userExists = yield User_1.default.findOne({ email });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Hash password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const user = yield User_1.default.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role
        });
        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role),
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id, user.role),
            });
        }
        else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.loginUser = loginUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({}).select("-password");
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Prevent self-deletion
        if (req.user && req.user._id.toString() === req.params.id) {
            res.status(400).json({ message: "Administrators cannot delete their own accounts." });
            return;
        }
        const user = yield User_1.default.findById(req.params.id);
        if (user) {
            yield user.deleteOne();
            res.json({ message: "User removed" });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.deleteUser = deleteUser;
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const totalUsers = yield User_1.default.countDocuments();
        const totalOrders = yield Order_1.default.countDocuments();
        const totalMedicines = yield Medicine_1.default.countDocuments();
        const totalPharmacies = yield Pharmacy_1.default.countDocuments();
        const revenueData = yield Order_1.default.aggregate([
            { $match: { status: "Completed" } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        const totalRevenue = ((_a = revenueData[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
        const recentOrders = yield Order_1.default.find()
            .populate("userId", "name")
            .sort({ createdAt: -1 })
            .limit(5);
        const pharmacies = yield Pharmacy_1.default.find({});
        res.json({
            stats: [
                { title: "Total Users", value: totalUsers.toString(), change: "+5%", trend: "up", icon: "Users", color: "#0F766E" },
                { title: "Total Orders", value: totalOrders.toString(), change: "+8%", trend: "up", icon: "ShoppingBag", color: "#2F8F7E" },
                { title: "Medicines", value: totalMedicines.toString(), change: "+2%", trend: "up", icon: "Pill", color: "#5FA79A" },
                { title: "Revenue", value: `$${totalRevenue.toFixed(2)}`, change: "+12%", trend: "up", icon: "DollarSign", color: "#0F766E" },
                { title: "Pharmacies", value: totalPharmacies.toString(), change: "+4%", trend: "up", icon: "MapPin", color: "#2F8F7E" },
                { title: "Growth Rate", value: "15.5%", change: "+2%", trend: "up", icon: "TrendingUp", color: "#5FA79A" },
            ],
            recentOrders,
            pharmacies
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
exports.getDashboardStats = getDashboardStats;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone || "",
            address: user.address || "",
            role: user.role,
            createdAt: user.createdAt,
            healthProfile: user.healthProfile || {
                conditions: [],
                allergies: [],
                medications: [],
                bloodType: "",
                emergencyContact: {
                    name: "",
                    relationship: "",
                    phone: ""
                }
            }
        });
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_1.default.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
            user.address = req.body.address !== undefined ? req.body.address : user.address;
            if (req.body.healthProfile) {
                user.healthProfile = Object.assign(Object.assign(Object.assign({}, user.healthProfile), req.body.healthProfile), { emergencyContact: Object.assign(Object.assign({}, (((_a = user.healthProfile) === null || _a === void 0 ? void 0 : _a.emergencyContact) || {})), (req.body.healthProfile.emergencyContact || {})) });
            }
            if (req.body.password) {
                const salt = yield bcryptjs_1.default.genSalt(10);
                user.password = yield bcryptjs_1.default.hash(req.body.password, salt);
            }
            const updatedUser = yield user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
                role: updatedUser.role,
                healthProfile: updatedUser.healthProfile,
                token: generateToken(updatedUser.id, updatedUser.role),
            });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Update failed", error: error.message });
    }
});
exports.updateUserProfile = updateUserProfile;
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (user) {
            user.role = req.body.role || user.role;
            const updatedUser = yield user.save();
            res.json({ _id: updatedUser._id, name: updatedUser.name, role: updatedUser.role });
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Update role failed", error: error.message });
    }
});
exports.updateUserRole = updateUserRole;
