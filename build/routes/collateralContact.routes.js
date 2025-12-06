"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collateralContact_controller_1 = require("../controllers/collateralContact.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const collateralContact_validator_1 = require("../validators/collateralContact.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new collateralContact_controller_1.CollateralContactController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(collateralContact_validator_1.collateralContactSchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.createCollateralContact(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getCollateralContacts(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getCollateralContactById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(collateralContact_validator_1.collateralContactSchema), (req, res) => controller.updateCollateralContact(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteCollateralContact(req, res));
exports.default = router;
//# sourceMappingURL=collateralContact.routes.js.map