"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const user_validator_1 = require("../validators/user.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new user_controller_1.UserController();
router.get("/", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN", "STAFF", "CLIENT"), (req, res) => void controller.getUsers(req, res));
router.get("/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN", "STAFF"), (req, res) => void controller.getUserById(req, res));
router.put("/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN", "STAFF"), (0, validate_middleware_1.validateRequest)(user_validator_1.updateuserSchema), (req, res) => void controller.updateUser(req, res));
router.delete("/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => void controller.deleteUser(req, res));
exports.default = router;
//# sourceMappingURL=user.routes.js.map