"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ledger_controller_1 = require("../controllers/ledger.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const ledger_validator_1 = require("../validators/ledger.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new ledger_controller_1.LedgerController();
router.post("/:patientid", (0, validate_middleware_1.validateRequest)(ledger_validator_1.ledgerSchema), auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.createLedger(req, res));
router.get("/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getLedgers(req, res));
router.get("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.getLedgerById(req, res));
router.put("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (0, validate_middleware_1.validateRequest)(ledger_validator_1.ledgerSchema), (req, res) => controller.updateLedger(req, res));
router.delete("/:id/:patientid", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)("ADMIN"), (req, res) => controller.deleteLedger(req, res));
exports.default = router;
//# sourceMappingURL=ledger.routes.js.map