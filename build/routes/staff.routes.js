"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staff_controller_1 = require("../controllers/staff.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const staff_validator_1 = require("../validators/staff.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new staff_controller_1.StaffController();
router.post('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(staff_validator_1.staffSchema), (req, res) => void controller.createStaff(req, res));
router.get('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => void controller.getStaffs(req, res));
router.get('/:id', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => void controller.getStaffById(req, res));
router.put('/:id', auth_middleware_1.authenticate, (0, validate_middleware_1.validateRequest)(staff_validator_1.staffSchema), (req, res) => void controller.updateStaff(req, res));
router.delete('/:id', auth_middleware_1.authenticate, (req, res) => void controller.deleteStaff(req, res));
exports.default = router;
//# sourceMappingURL=staff.routes.js.map