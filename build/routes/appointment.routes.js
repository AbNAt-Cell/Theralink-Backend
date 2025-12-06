"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = require("../controllers/appointment.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const appointment_validator_1 = require("../validators/appointment.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new appointment_controller_1.AppointmentController();
router.post("/", auth_middleware_1.authenticate, (0, validate_middleware_1.validateRequest)(appointment_validator_1.appointmentSchema), (req, res) => void controller.createAppointment(req, res));
router.get("/", auth_middleware_1.authenticate, (req, res) => void controller.getAppointments(req, res));
router.get("/:id", auth_middleware_1.authenticate, (req, res) => void controller.getAppointmentById(req, res));
router.put("/:id", auth_middleware_1.authenticate, (0, validate_middleware_1.validateRequest)(appointment_validator_1.appointmentSchema), (req, res) => void controller.updateAppointment(req, res));
router.delete("/:id", auth_middleware_1.authenticate, (req, res) => void controller.deleteAppointment(req, res));
exports.default = router;
//# sourceMappingURL=appointment.routes.js.map