import { Router } from "express";
import { AppointmentController } from "../controllers/appointment.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { appointmentSchema } from "../validators/appointment.validator";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();
const controller = new AppointmentController();

router.post("/", authenticate, validateRequest(appointmentSchema), (req, res) => void controller.createAppointment(req, res));
router.get("/", authenticate, (req, res) => void controller.getAppointments(req, res));
router.get("/:id", authenticate, (req, res) => void controller.getAppointmentById(req, res));
router.put("/:id", authenticate, validateRequest(appointmentSchema), (req, res) => void controller.updateAppointment(req, res));
router.delete("/:id", authenticate, (req, res) => void controller.deleteAppointment(req, res));

export default router;

/**
 * @swagger
 * /api/appointment:
 *   get:
 *     tags: [Appointment]
 *     summary: Get all appointment
 *     responses:
 *       200:
 *         description: List of appointment retrieved successfully
 *
 *   post:
 *     tags: [Appointment]
 *     summary: Create new patient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, PENDING,CANCELLED]
 *               date:
 *                 type: string
 *                 format: date
 *
 * /api/appointment/{id}:
 *   get:
 *     tags: [Appointment]
 *     summary: Get patient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *   put:
 *     tags: [Appointment]
 *     summary: Update patient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *   delete:
 *     tags: [Appointment]
 *     summary: Delete patient
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
