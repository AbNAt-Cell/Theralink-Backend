"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patient_controller_1 = require("../controllers/patient.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const patient_validator_1 = require("../validators/patient.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new patient_controller_1.PatientController();
router.post('/', auth_middleware_1.authenticate, (0, validate_middleware_1.validateRequest)(patient_validator_1.patientSchema), (req, res) => void controller.createPatient(req, res));
router.get('/', auth_middleware_1.authenticate, (req, res) => void controller.getPatients(req, res));
router.get('/:id', auth_middleware_1.authenticate, (req, res) => void controller.getPatientById(req, res));
router.put('/:id', auth_middleware_1.authenticate, (0, validate_middleware_1.validateRequest)(patient_validator_1.patientSchema), (req, res) => void controller.updatePatient(req, res));
router.delete('/:id', auth_middleware_1.authenticate, (req, res) => void controller.deletePatient(req, res));
exports.default = router;
//# sourceMappingURL=patient.routes.js.map