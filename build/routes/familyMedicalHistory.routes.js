"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const familyMedicalHistory_controller_1 = require("../controllers/familyMedicalHistory.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const familyMedicalHistory_validator_1 = require("../validators/familyMedicalHistory.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new familyMedicalHistory_controller_1.FamilyMedicalHistoryController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(familyMedicalHistory_validator_1.familyMedicalHistorySchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => void controller.createFamilyMedicalHistory(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => void controller.getFamilyMedicalHistorys(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => void controller.getFamilyMedicalHistoryById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(familyMedicalHistory_validator_1.familyMedicalHistorySchema), (req, res) => void controller.updateFamilyMedicalHistory(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => void controller.deleteFamilyMedicalHistory(req, res));
exports.default = router;
//# sourceMappingURL=familyMedicalHistory.routes.js.map