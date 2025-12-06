"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const treatmentObjective_controller_1 = require("../controllers/treatmentObjective.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const treatmentObjective_validator_1 = require("../validators/treatmentObjective.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new treatmentObjective_controller_1.TreatmentObjectiveController();
router.post("/:treatmentgoalsId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(treatmentObjective_validator_1.treatmentObjectiveSchema), (req, res) => controller.createTreatmentObjective(req, res));
router.get("/:treatmentgoalsId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getTreatmentObjectives(req, res));
router.get("/:id/:treatmentgoalsId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getTreatmentObjectiveById(req, res));
router.put("/:id/:treatmentgoalsId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(treatmentObjective_validator_1.treatmentObjectiveSchema), (req, res) => controller.updateTreatmentObjective(req, res));
router.delete("/:id/:treatmentgoalsId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteTreatmentObjective(req, res));
exports.default = router;
//# sourceMappingURL=treatmentObjective.routes.js.map