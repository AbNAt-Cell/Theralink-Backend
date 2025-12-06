"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vitals_controller_1 = require("../controllers/vitals.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const vital_validator_1 = require("../validators/vital.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new vitals_controller_1.VitalController();
router.post("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.createVital(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getVitals(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getVitalById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(vital_validator_1.vitalSchema), (req, res) => controller.updateVital(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteVital(req, res));
exports.default = router;
//# sourceMappingURL=vital.routes.js.map