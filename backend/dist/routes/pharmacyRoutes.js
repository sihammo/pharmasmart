"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pharmacyController_1 = require("../controllers/pharmacyController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route("/my-pharmacy")
    .get(authMiddleware_1.protect, pharmacyController_1.getMyPharmacy)
    .put(authMiddleware_1.protect, pharmacyController_1.updateMyPharmacy);
router.route("/")
    .get(pharmacyController_1.getPharmacies)
    .post(authMiddleware_1.protect, pharmacyController_1.createPharmacy);
router.route("/:id")
    .put(authMiddleware_1.protect, pharmacyController_1.updatePharmacy)
    .delete(authMiddleware_1.protect, authMiddleware_1.adminOnly, pharmacyController_1.deletePharmacy);
exports.default = router;
