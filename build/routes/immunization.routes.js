"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const immunization_controller_1 = require("../controllers/immunization.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const immunization_validator_1 = require("../validators/immunization.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new immunization_controller_1.ImmunizationController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(immunization_validator_1.immunizationSchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.createImmunization(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getImmunizations(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getImmunizationById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(immunization_validator_1.immunizationSchema), (req, res) => controller.updateImmunization(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteImmunization(req, res));
exports.default = router;
//# sourceMappingURL=immunization.routes.js.map