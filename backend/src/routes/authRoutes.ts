import express from "express";
import { registerUser, loginUser, getAllUsers, deleteUser } from "../controllers/authController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, getAllUsers);
router.delete("/users/:id", protect, deleteUser);
router.get("/stats", protect, getDashboardStats);

export default router;
