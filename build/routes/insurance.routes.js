"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const insurance_controller_1 = require("../controllers/insurance.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const insurance_validator_1 = require("../validators/insurance.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new insurance_controller_1.InsuranceController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(insurance_validator_1.insuranceSchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.createInsurance(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getInsurances(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getInsuranceById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(insurance_validator_1.insuranceSchema), (req, res) => controller.updateInsurance(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteInsurance(req, res));
exports.default = router;
//# sourceMappingURL=insurance.routes.js.map