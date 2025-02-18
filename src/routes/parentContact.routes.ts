import { Router } from "express";
import { ParentContactController } from "../controllers/parentContact.controller";
import { validateRequest } from "../middleware/validate.middleware";
import { parentContactSchema } from "../validators/parentContact.validator";
import { authenticate, authorize } from "../middleware/auth.middleware";

const router = Router();
const controller = new ParentContactController();
router.post(
  "/:patientid",
  validateRequest(parentContactSchema),
  authenticate,
  authorize("ADMIN"),
  (req, res) => controller.createParentContact(req, res)
);

// Route to get all ParentContacts for a patient
router.get("/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getParentContacts(req, res)
);

// Route to get a specific parentContact by ID
router.get("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.getParentContactById(req, res)
);

// Route to Update specific parentContact
router.put(
  "/:id/:patientid",
  authenticate,
  authorize("ADMIN"),
  validateRequest(parentContactSchema),
  (req, res) => controller.updateParentContact(req, res)
);

// Route to delete a specific parentContact
router.delete("/:id/:patientid", authenticate, authorize("ADMIN"), (req, res) =>
  controller.deleteParentContact(req, res)
);

export default router;
/**
 * @swagger
 * /api/parentContacts/{patientId}:
 *   get:
 *     tags:
 *       - ParentContact
 *     summary: Get all ParentContact records for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient whose ParentContact records are being retrieved
 *     responses:
 *       200:
 *         description: List of patient ParentContact records retrieved successfully
 *
 *   post:
 *     tags:
 *       - ParentContact
 *     summary: Create a new ParentContact record for a patient
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the patient for whom the ParentContact is being created
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               relationship:
 *                 type: string
 *                 enum:
 *                   - AUNT
 *                   - BROTHER
 *                   - CAREGIVER
 *                   - CLIENT
 *                   - COUSIN
 *                   - DAUGHTER
 *                   - FATHER
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               state:
 *                 type: string
 *               comments:
 *                 type: string
 *     responses:
 *       201:
 *         description: ParentContact record created successfully
 *
 * /api/parentContacts/{id}/{patientId}:
 *   get:
 *     tags:
 *       - ParentContact
 *     summary: Get a specific ParentContact record by patient ID and ParentContact ID
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
 *         description: ID of the ParentContact record
 *     responses:
 *       200:
 *         description: ParentContact record retrieved successfully
 *
 *   put:
 *     tags:
 *       - ParentContact
 *     summary: Update a ParentContact record for a patient
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
 *         description: ID of the ParentContact record to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               relationship:
 *                 type: string
 *                 enum:
 *                   - AUNT
 *                   - BROTHER
 *                   - CAREGIVER
 *                   - CLIENT
 *                   - COUSIN
 *                   - DAUGHTER
 *                   - FATHER
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               state:
 *                 type: string
 *               comments:
 *                 type: string
 *     responses:
 *       200:
 *         description: ParentContact record updated successfully
 *
 *   delete:
 *     tags:
 *       - ParentContact
 *     summary: Delete a specific ParentContact record
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
 *         description: ID of the ParentContact record to be deleted
 *     responses:
 *       204:
 *         description: ParentContact record deleted successfully
 */
