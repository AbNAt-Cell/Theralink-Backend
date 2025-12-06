"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicalHistory_controller_1 = require("../controllers/medicalHistory.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const medicalHistory_validator_1 = require("../validators/medicalHistory.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new medicalHistory_controller_1.MedicalHistoryController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(medicalHistory_validator_1.medicalHistorySchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => void controller.createMedicalHistory(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => void controller.getMedicalHistorys(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => void controller.getMedicalHistoryById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(medicalHistory_validator_1.medicalHistorySchema), (req, res) => void controller.updateMedicalHistory(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => void controller.deleteMedicalHistory(req, res));
exports.default = router;
//# sourceMappingURL=mediaclHistory.routes.js.map