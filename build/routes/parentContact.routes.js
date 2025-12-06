"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parentContact_controller_1 = require("../controllers/parentContact.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const parentContact_validator_1 = require("../validators/parentContact.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new parentContact_controller_1.ParentContactController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(parentContact_validator_1.parentContactSchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.createParentContact(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getParentContacts(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getParentContactById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(parentContact_validator_1.parentContactSchema), (req, res) => controller.updateParentContact(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteParentContact(req, res));
exports.default = router;
//# sourceMappingURL=parentContact.routes.js.map