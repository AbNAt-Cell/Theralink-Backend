"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const educationBackground_controller_1 = require("../controllers/educationBackground.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const educationBackground_validator_1 = require("../validators/educationBackground.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new educationBackground_controller_1.EducationBackgroundController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(educationBackground_validator_1.educationBackgroundSchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.createEducationBackground(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getEducationBackgrounds(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getEducationBackgroundById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(educationBackground_validator_1.educationBackgroundSchema), (req, res) => controller.updateEducationBackground(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteEducationBackground(req, res));
exports.default = router;
//# sourceMappingURL=educationBackground.routes.js.map