"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientSignature_controller_1 = require("../controllers/clientSignature.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const clientSignature_validator_1 = require("../validators/clientSignature.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new clientSignature_controller_1.ClientSignatureController();
router.post("/", auth_middleware_1.authenticate, (0, validate_middleware_1.validateRequest)(clientSignature_validator_1.clientSignatureSchema), (req, res) => void controller.createClientSignature(req, res));
router.get("/", (req, res) => void controller.getClientSignatures(req, res));
router.get("/:id", auth_middleware_1.authenticate, (req, res) => void controller.getClientSignatureById(req, res));
router.put("/:id", auth_middleware_1.authenticate, (0, validate_middleware_1.validateRequest)(clientSignature_validator_1.clientSignatureSchema), (req, res) => void controller.updateClientSignature(req, res));
router.delete("/:id", auth_middleware_1.authenticate, (req, res) => void controller.deleteClientSignature(req, res));
exports.default = router;
//# sourceMappingURL=clientSignature.routes.js.map