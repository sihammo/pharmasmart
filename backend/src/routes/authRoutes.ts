import express from "express";
import { registerUser, loginUser, getAllUsers, deleteUser, getDashboardStats, getUserProfile, updateUserProfile, updateUserRole } from "../controllers/authController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id/role", protect, adminOnly, updateUserRole);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.get("/stats", protect, adminOnly, getDashboardStats);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
