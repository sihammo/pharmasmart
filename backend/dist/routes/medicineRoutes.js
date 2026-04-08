"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medicineController_1 = require("../controllers/medicineController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/pharmacy/:pharmacyId", medicineController_1.getMyMedicines);
router.route("/")
    .get(medicineController_1.getMedicines)
    .post(authMiddleware_1.protect, medicineController_1.createMedicine);
router.route("/:id")
    .put(authMiddleware_1.protect, medicineController_1.updateMedicine)
    .delete(authMiddleware_1.protect, medicineController_1.deleteMedicine);
exports.default = router;
