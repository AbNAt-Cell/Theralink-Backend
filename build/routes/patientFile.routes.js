"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientFile_controller_1 = require("../controllers/patientFile.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const patientFile_validator_1 = require("../validators/patientFile.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new patientFile_controller_1.PatientFileController();
router.post("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(patientFile_validator_1.patientFileSchema), (req, res) => controller.createPatientFile(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getPatientFiles(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getPatientFileById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(patientFile_validator_1.patientFileSchema), (req, res) => controller.updatePatientFile(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deletePatientFile(req, res));
exports.default = router;
//# sourceMappingURL=patientFile.routes.js.map