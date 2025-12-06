"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactNote_controller_1 = require("../controllers/contactNote.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const contactNote_validator_1 = require("../validators/contactNote.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new contactNote_controller_1.ContactNoteController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(contactNote_validator_1.contactNoteSchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.createContactNote(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getContactNotes(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getContactNoteById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(contactNote_validator_1.contactNoteSchema), (req, res) => controller.updateContactNote(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteContactNote(req, res));
exports.default = router;
//# sourceMappingURL=contactNote.routes.js.map