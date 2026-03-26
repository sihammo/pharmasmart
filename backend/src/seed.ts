
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User";
import Pharmacy from "./models/Pharmacy";
import Medicine from "./models/Medicine";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("✅ Connected to MongoDB for seeding...");

    // 1. Clear existing data
    await User.deleteMany();
    await Pharmacy.deleteMany();
    await Medicine.deleteMany();
    console.log("🗑️  Cleared existing data.");

    // 2. Create Admin/Owner User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@pharmasmart.com",
      password: hashedPassword,
      phone: "1234567890",
      role: "ADMIN"
    });
    console.log("👤 Created Admin User.");

    // 3. Create Pharmacies
    const pharmacy1 = await Pharmacy.create({
      name: "HealthPlus Pharmacy",
      ownerId: admin._id,
      address: "123 Main Street, Downtown",
      phone: "+1 (555) 123-4567",
      licenseNumber: "LP-12345",
      isApproved: true,
      location: { type: "Point", coordinates: [-74.0060, 40.7128] }
    });

    const pharmacy2 = await Pharmacy.create({
      name: "MediCare Central",
      ownerId: admin._id,
      address: "456 Oak Avenue, Midtown",
      phone: "+1 (555) 234-5678",
      licenseNumber: "LP-67890",
      isApproved: true,
      location: { type: "Point", coordinates: [-73.9855, 40.7580] }
    });
    console.log("🏥 Created 2 Pharmacies.");

    // 4. Create Medicines
    const medicines = [
      {
        name: "Paracetamol 500mg",
        pharmacyId: pharmacy1._id,
        category: "Pain Relief",
        description: "Effective pain and fever relief",
        price: 8.99,
        stockQuantity: 100,
        imageUrl: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        requiresPrescription: false
      },
      {
        name: "Amoxicillin 250mg",
        pharmacyId: pharmacy1._id,
        category: "Antibiotics",
        description: "Broad-spectrum antibiotic",
        price: 15.99,
        stockQuantity: 50,
        imageUrl: "https://images.unsplash.com/photo-1631669969504-f35518bf96ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        requiresPrescription: true
      },
      {
        name: "Vitamin D3 1000 IU",
        pharmacyId: pharmacy2._id,
        category: "Vitamins",
        description: "Essential vitamin supplement",
        price: 12.50,
        stockQuantity: 200,
        imageUrl: "https://images.unsplash.com/photo-1768403305881-a7a82fd63512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        requiresPrescription: false
      },
      {
        name: "Ibuprofen 400mg",
        pharmacyId: pharmacy2._id,
        category: "Pain Relief",
        description: "Anti-inflammatory pain reliever",
        price: 10.99,
        stockQuantity: 75,
        imageUrl: "https://images.unsplash.com/photo-1646392206581-2527b1cae5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        requiresPrescription: false
      }
    ];

    await Medicine.insertMany(medicines);
    console.log("💊 Created 4 Medicines.");

    console.log("✨ Seeding Complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    process.exit(1);
  }
};

seedData();
