"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const treatmentPlanGoals_controller_1 = require("../controllers/treatmentPlanGoals.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const treatmentGoals_validator_1 = require("../validators/treatmentGoals.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new treatmentPlanGoals_controller_1.TreatmentGoalsController();
router.post("/:treatmentplanId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(treatmentGoals_validator_1.treatmentGoalsSchema), (req, res) => controller.createTreatmentGoals(req, res));
router.get("/:treatmentplanId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getTreatmentGoalss(req, res));
router.get("/:id/:treatmentplanId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getTreatmentGoalsById(req, res));
router.put("/:id/:treatmentplanId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(treatmentGoals_validator_1.treatmentGoalsSchema), (req, res) => controller.updateTreatmentGoals(req, res));
router.delete("/:id/:treatmentplanId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteTreatmentGoals(req, res));
exports.default = router;
//# sourceMappingURL=treatmentGoals.routes.js.map