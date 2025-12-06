"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const physician_controller_1 = require("../controllers/physician.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const physician_validator_1 = require("../validators/physician.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new physician_controller_1.PhysicianController();
router.post("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(physician_validator_1.physicianSchema), (req, res) => controller.createPhysician(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getPhysicians(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getPhysicianById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(physician_validator_1.physicianSchema), (req, res) => controller.updatePhysician(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deletePhysician(req, res));
exports.default = router;
//# sourceMappingURL=physician.routes.js.map