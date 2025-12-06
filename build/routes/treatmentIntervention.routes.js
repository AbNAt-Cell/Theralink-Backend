"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const treatmentIntervention_controller_1 = require("../controllers/treatmentIntervention.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const treatmentIntervention_validator_1 = require("../validators/treatmentIntervention.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new treatmentIntervention_controller_1.TreatmentInterventionController();
router.post("/:treatmentobjectiveId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(treatmentIntervention_validator_1.treatmentInterventionSchema), (req, res) => controller.createTreatmentIntervention(req, res));
router.get("/:treatmentobjectiveId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getTreatmentInterventions(req, res));
router.get("/:id/:treatmentobjectiveId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getTreatmentInterventionById(req, res));
router.put("/:id/:treatmentobjectiveId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(treatmentIntervention_validator_1.treatmentInterventionSchema), (req, res) => controller.updateTreatmentIntervention(req, res));
router.delete("/:id/:treatmentobjectiveId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteTreatmentIntervention(req, res));
exports.default = router;
//# sourceMappingURL=treatmentIntervention.routes.js.map