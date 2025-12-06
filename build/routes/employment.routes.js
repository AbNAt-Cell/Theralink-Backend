"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employment_controller_1 = require("../controllers/employment.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const employment_validator_1 = require("../validators/employment.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new employment_controller_1.EmploymentController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(employment_validator_1.employmentSchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.createEmployment(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getEmployments(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getEmploymentById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(employment_validator_1.employmentSchema), (req, res) => controller.updateEmployment(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteEmployment(req, res));
exports.default = router;
//# sourceMappingURL=employment.routes.js.map