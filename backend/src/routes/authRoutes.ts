import express from "express";
import { registerUser, loginUser, getAllUsers, deleteUser, getDashboardStats } from "../controllers/authController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.get("/stats", protect, adminOnly, getDashboardStats);

export default router;
