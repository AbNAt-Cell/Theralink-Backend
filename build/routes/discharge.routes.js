"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const discharge_controller_1 = require("../controllers/discharge.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const discharge_validator_1 = require("../validators/discharge.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new discharge_controller_1.DischargeController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(discharge_validator_1.dischargeSchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.createDischarge(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getDischarges(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getDischargeById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(discharge_validator_1.dischargeSchema), (req, res) => controller.updateDischarge(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteDischarge(req, res));
exports.default = router;
//# sourceMappingURL=discharge.routes.js.map