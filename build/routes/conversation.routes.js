"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const conversation_controller_1 = require("../controllers/conversation.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const conversation_validator_1 = require("../validators/conversation.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new conversation_controller_1.ConversationController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(conversation_validator_1.conversationSchema), auth_middleware_1.authenticate, (req, res) => void controller.createConversation(req, res));
router.get("/", auth_middleware_1.authenticate, (req, res) => void controller.getConversations(req, res));
router.get("/:id", auth_middleware_1.authenticate, (req, res) => void controller.getConversationById(req, res));
router.put("/:id", auth_middleware_1.authenticate, (0, validate_middleware_1.validateRequest)(conversation_validator_1.conversationSchema), (req, res) => void controller.updateConversation(req, res));
router.delete("/:id", auth_middleware_1.authenticate, (req, res) => void controller.deleteConversation(req, res));
exports.default = router;
//# sourceMappingURL=conversation.routes.js.map