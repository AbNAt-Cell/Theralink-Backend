"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const treatmentPlan_controller_1 = require("../controllers/treatmentPlan.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const treatmentPlan_validator_1 = require("../validators/treatmentPlan.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new treatmentPlan_controller_1.TreatmentPlanController();
router.post("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(treatmentPlan_validator_1.treatmentPlanSchema), (req, res) => controller.createTreatmentPlan(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN", "CLIENT"), (req, res) => controller.getTreatmentPlans(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getTreatmentPlanById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(treatmentPlan_validator_1.treatmentPlanSchema), (req, res) => controller.updateTreatmentPlan(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteTreatmentPlan(req, res));
exports.default = router;
//# sourceMappingURL=treatmentPlan.routes.js.map