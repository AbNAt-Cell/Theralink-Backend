import { Router } from "express";
import { TreatmentGoalsController } from "../controllers/treatmentPlanGoals.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { treatmentGoalsSchema } from "../validators/treatmentGoals.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";
// import { treatmentGoalsSchema } from '';
// import { insSchema } from '../validators/in.validator';

const router = Router();
const controller = new TreatmentGoalsController();
router.post("/:treatmentplanId", authenticate, authorize("ADMIN"), (req, res) =>
  controller.createTreatmentGoals(req, res)
);

// Route to get all Treatment Goals for a patient
router.get("/:treatmentplanId", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getTreatmentGoalss(req, res)
);

// Route to get a specific treatmentGoals by ID
router.get("/:id/:treatmentplanId", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getTreatmentGoalsById(req, res)
);

// Route to Update specific treatmentGoals
router.put(
  "/:id/:treatmentplanId",
  authenticate,
  authorize("ADMIN"),
  validateRequest(treatmentGoalsSchema),
  (req, res) => controller.updateTreatmentGoals(req, res)
);

// Route to delete a specific treatmentGoals
router.delete("/:id/:treatmentplanId", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteTreatmentGoals(req, res)
);

export default router;
/**
 * @swagger
 * /api/treatmentGoals/{treatmentplanId}:
 *   get:
 *     tags: [TreatmentGoals]
 *     summary: Get all treatmentGoals records for a patient
 *     parameters:
 *       - in: path
 *         name: treatmentplanId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient whose treatmentGoals records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient treatmentGoals records retrieved successfully
 *
 *   post:
 *     tags: [TreatmentGoals]
 *     summary: Create new treatmentGoals for a patient
 *     parameters:
 *       - in: path
 *         name: treatmentplanId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient for whom treatmentGoals is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               stepdownServices:
 *                 type: string
 *               dischargeGoals:
 *                 type: string
 *               agencies:
 *                 type: string
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               abilities:
 *                 type: string
 *               preferences:
 *                 type: string
 *               service:
 *                 type: string
 *               placeOfService:
 *                 type: string
 *               maintenanceRecommendation:
 *                 type: string
 *               strength:
 *                 type: string
 *               needs:
 *                 type: string
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: TreatmentGoals record created successfully
 *
 * /api/treatmentGoals/{id}/{treatmentplanId}:
 *   get:
 *     tags: [TreatmentGoals]
 *     summary: Get a specific treatmentGoals record by patient ID and treatmentGoals ID
 *     parameters:
 *       - in: path
 *         name: treatmentplanId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID of the treatmentGoals record
 *     responses:
 *       200:
 *         description: TreatmentGoals record retrieved successfully
 *
 *   put:
 *     tags: [TreatmentGoals]
 *     summary: Update treatmentGoals record for a patient
 *     parameters:
 *       - in: path
 *         name: treatmentplanId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID of the treatmentGoals record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               treatmentGoalsType:
 *                 type: string
 *               policyNumber:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [PRIMARY, COPAY]
 *               eligibilityStatus:
 *                 type: string
 *                 enum: [PENDING, ELIGIBLE, INELIGIBLE, UNDER_REVIEW, EXPIRED, REVOKED]
 *     responses:
 *       200:
 *         description: TreatmentGoals record updated successfully
 *
 *   delete:
 *     tags: [TreatmentGoals]
 *     summary: Delete a specific treatmentGoals record
 *     parameters:
 *       - in: path
 *         name: treatmentplanId
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment Plan ID of the patient
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Treatment goal ID of the treatmentGoals record to be deleted
 *     responses:
 *       204:
 *         description: TreatmentGoals record deleted successfully
 */
