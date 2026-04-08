import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import path from "path";
import { connectDB } from "./config/db";
import { initSocket } from "./socket";
import authRoutes from "./routes/authRoutes";
import pharmacyRoutes from "./routes/pharmacyRoutes";
import medicineRoutes from "./routes/medicineRoutes";
import orderRoutes from "./routes/orderRoutes";
import uploadRoutes from "./routes/uploadRoutes";

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer);

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pharmacies", pharmacyRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("PharmaSmart API is running...");
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
