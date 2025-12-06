"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const socialDeterminants_controller_1 = require("../controllers/socialDeterminants.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const socialDeterminant_validator_1 = require("../validators/socialDeterminant.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new socialDeterminants_controller_1.SocialDeterminantsController();
router.post("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(socialDeterminant_validator_1.socialDeterminantSchema), (req, res) => controller.createSocialDeterminants(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getSocialDeterminants(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getSocialDeterminantsById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(socialDeterminant_validator_1.socialDeterminantSchema), (req, res) => controller.updateSocialDeterminants(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteSocialDeterminants(req, res));
exports.default = router;
//# sourceMappingURL=socialDeterminants.routes.js.map