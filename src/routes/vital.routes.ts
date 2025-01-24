import { Router } from "express";
import { VitalController } from "../controllers/vitals.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { vitalSchema } from "../validators/vital.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
// import { vitalSchema } from '';
// import { insSchema } from '../validators/in.validator';

const router = Router();
const controller = new VitalController();
router.post("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.createVital(req, res)
);

// Route to get all Vitals for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getVitals(req, res)
);

// Route to get a specific vitals by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getVitalById(req, res)
);

// Route to Update specific vitals
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(vitalSchema),
  (req, res) => controller.updateVital(req, res)
);

// Route to delete a specific vitals
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteVital(req, res)
);

export default router;

/**
 * @swagger
 * /api/vitals/{patientId}:
 *   get:
 *     tags: [Vital]
 *     summary: Get all vitals records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose vitals records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient vitals records retrieved successfully
 *
 *   post:
 *     tags: [Vital]
 *     summary: Create new vitals for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom vitals is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bpSys:
 *                 type: number
 *               bpDias:
 *                 type: number
 *               temperature:
 *                 type: number 
 *               pulseRate:
 *                 type: number
 *               weight:
 *                 type: number 
 *               respiratoryRate:
 *                 type: number
 *               recordDate:
 *                 type: string
 *                 format: date
 *               height:
 *                 type: number
 *     responses:
 *       201:
 *         description: Vital record created successfully
 *
 * /api/vitals/{id}/{patientId}:
 *   get:
 *     tags: [Vital]
 *     summary: Get a specific vitals record by patient ID and vitals ID
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the vitals record
 *     responses:
 *       200:
 *         description: Vital record retrieved successfully
 *
 *   put:
 *     tags: [Vital]
 *     summary: Update vitals record for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the vitals record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bpSys:
 *                 type: number
 *               bpDias:
 *                 type: number
 *               temperature:
 *                 type: number 
 *               pulseRate:
 *                 type: number
 *               weight:
 *                 type: number 
 *               respiratoryRate:
 *                 type: number
 *               recordDate:
 *                 type: string
 *                 format: date
 *               height:
 *                 type: number
 *     responses:
 *       200:
 *         description: Vital record updated successfully
 *
 *   delete:
 *     tags: [Vital]
 *     summary: Delete a specific vitals record
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the vitals record to be deleted
 *     responses:
 *       204:
 *         description: Vital record deleted successfully
 */
