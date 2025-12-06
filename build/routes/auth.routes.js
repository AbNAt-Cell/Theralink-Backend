"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_validator_1 = require("../validators/auth.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const tokenBlacklist_1 = require("../utils/tokenBlacklist");
const router = (0, express_1.Router)();
const controller = new auth_controller_1.AuthController();
router.post("/signup", (0, validate_middleware_1.validateRequest)(auth_validator_1.signupSchema), (req, res) => {
    void controller.signup(req, res);
});
router.post("/login", (0, validate_middleware_1.validateRequest)(auth_validator_1.loginSchema), (req, res) => {
    void controller.login(req, res);
});
router.post("/forgot-password", (0, validate_middleware_1.validateRequest)(auth_validator_1.forgotPasswordSchema), (req, res) => {
    void controller.forgotPassword(req, res);
});
router.post("/reset-password", (0, validate_middleware_1.validateRequest)(auth_validator_1.resetPasswordSchema), (req, res) => {
    void controller.resetPassword(req, res);
});
router.get("/me", auth_middleware_1.authenticate, async (req, res, next) => {
    try {
        await controller.me(req, res);
    }
    catch (err) {
        next(err);
    }
});
router.post("/logout", auth_middleware_1.authenticate, async (req, res) => {
    const token = req.token;
    if (token)
        tokenBlacklist_1.tokenBlacklist.add(token);
    res.status(200).json({ message: "Logged out successfully" });
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map