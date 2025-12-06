"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const diagnosis_controller_1 = require("../controllers/diagnosis.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const diagnosis_validator_1 = require("../validators/diagnosis.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new diagnosis_controller_1.DiagnosisController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(diagnosis_validator_1.diagnosisSchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.createDiagnosis(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN", "CLIENT"), (req, res) => controller.getDiagnosis(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getDiagnosisById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(diagnosis_validator_1.diagnosisSchema), (req, res) => controller.updateDiagnosis(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteDiagnosis(req, res));
exports.default = router;
//# sourceMappingURL=diagnosis.routes.js.map