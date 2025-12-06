"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicationAdminstration_controller_1 = require("../controllers/medicationAdminstration.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const medicationAdminstration_validator_1 = require("../validators/medicationAdminstration.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new medicationAdminstration_controller_1.MedicationAdminstrationController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(medicationAdminstration_validator_1.medicationAdminstrationSchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.createMedicationAdminstration(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getMedicationAdminstrations(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getMedicationAdminstrationById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(medicationAdminstration_validator_1.medicationAdminstrationSchema), (req, res) => controller.updateMedicationAdminstration(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteMedicationAdminstration(req, res));
exports.default = router;
//# sourceMappingURL=medicationAdminstration.routes.js.map