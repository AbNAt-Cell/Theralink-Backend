"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parentSignature_controller_1 = require("../controllers/parentSignature.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const parentSignature_validator_1 = require("../validators/parentSignature.validator");
const router = (0, express_1.Router)();
const controller = new parentSignature_controller_1.ParentSignatureController();
router.post("/", (0, validate_middleware_1.validateRequest)(parentSignature_validator_1.parentSignatureSchema), (req, res) => void controller.createParentSignature(req, res));
router.get("/", (req, res) => void controller.getParentSignatures(req, res));
router.get("/:id", (req, res) => void controller.getParentSignatureById(req, res));
router.put("/:id", (0, validate_middleware_1.validateRequest)(parentSignature_validator_1.parentSignatureSchema), (req, res) => void controller.updateParentSignature(req, res));
router.delete("/:id", (req, res) => void controller.deleteParentSignature(req, res));
exports.default = router;
//# sourceMappingURL=parentSignature.routes.js.map