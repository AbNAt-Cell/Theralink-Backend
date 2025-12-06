"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medication_controller_1 = require("../controllers/medication.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const medication_validator_1 = require("../validators/medication.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new medication_controller_1.MedicationController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(medication_validator_1.medicationSchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.createMedication(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getMedications(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getMedicationById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(medication_validator_1.medicationSchema), (req, res) => controller.updateMedication(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteMedication(req, res));
exports.default = router;
//# sourceMappingURL=medication.routes.js.map