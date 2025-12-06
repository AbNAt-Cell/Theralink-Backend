"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const swagger_1 = require("./config/swagger");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const patient_routes_1 = __importDefault(require("./routes/patient.routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const insurance_routes_1 = __importDefault(require("./routes/insurance.routes"));
const diagnosis_routes_1 = __importDefault(require("./routes/diagnosis.routes"));
const document_routes_1 = __importDefault(require("./routes/document.routes"));
const ledger_routes_1 = __importDefault(require("./routes/ledger.routes"));
const medication_routes_1 = __importDefault(require("./routes/medication.routes"));
const medicationAdminstration_routes_1 = __importDefault(require("./routes/medicationAdminstration.routes"));
const vital_routes_1 = __importDefault(require("./routes/vital.routes"));
const service_routes_1 = __importDefault(require("./routes/service.routes"));
const physician_routes_1 = __importDefault(require("./routes/physician.routes"));
const immunization_routes_1 = __importDefault(require("./routes/immunization.routes"));
const parentContact_routes_1 = __importDefault(require("./routes/parentContact.routes"));
const collateralContact_routes_1 = __importDefault(require("./routes/collateralContact.routes"));
const contactNote_routes_1 = __importDefault(require("./routes/contactNote.routes"));
const educationBackground_routes_1 = __importDefault(require("./routes/educationBackground.routes"));
const employment_routes_1 = __importDefault(require("./routes/employment.routes"));
const socialDeterminants_routes_1 = __importDefault(require("./routes/socialDeterminants.routes"));
const clientSignature_routes_1 = __importDefault(require("./routes/clientSignature.routes"));
const parentSignature_routes_1 = __importDefault(require("./routes/parentSignature.routes"));
const treatmentPlan_routes_1 = __importDefault(require("./routes/treatmentPlan.routes"));
const treatmentGoals_routes_1 = __importDefault(require("./routes/treatmentGoals.routes"));
const treatmentObjective_routes_1 = __importDefault(require("./routes/treatmentObjective.routes"));
const treatmentIntervention_routes_1 = __importDefault(require("./routes/treatmentIntervention.routes"));
const discharge_routes_1 = __importDefault(require("./routes/discharge.routes"));
const mediaclHistory_routes_1 = __importDefault(require("./routes/mediaclHistory.routes"));
const familyMedicalHistory_routes_1 = __importDefault(require("./routes/familyMedicalHistory.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const conversation_routes_1 = __importDefault(require("./routes/conversation.routes"));
const staff_routes_1 = __importDefault(require("./routes/staff.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const redis_streams_adapter_1 = require("@socket.io/redis-streams-adapter");
const redis_1 = __importDefault(require("./config/redis"));
const message_socket_1 = __importDefault(require("./sockets/message.socket"));
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
exports.httpServer = httpServer;
const io = new socket_io_1.Server(httpServer, {
    adapter: (0, redis_streams_adapter_1.createAdapter)(redis_1.default),
    cors: {
        origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
    },
});
if (!process.env.FRONTEND_URL) {
    throw new Error("No FRONTEND_URl");
}
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.get("/", (_req, res) => {
    res.json({ status: "API is running" });
});
app.use(express_1.default.json());
app.use("/api/auth", auth_routes_1.default);
app.use("/api/patients", patient_routes_1.default);
app.use("/api/appointment", appointment_routes_1.default);
app.use("/api/insurance", insurance_routes_1.default);
app.use("/api/diagnosis", diagnosis_routes_1.default);
app.use("/api/document", document_routes_1.default);
app.use("/api/ledger", ledger_routes_1.default);
app.use("/api/medication", medication_routes_1.default);
app.use("/api/medicationAdminstration", medicationAdminstration_routes_1.default);
app.use("/api/vitals", vital_routes_1.default);
app.use("/api/service", service_routes_1.default);
app.use("/api/physician", physician_routes_1.default);
app.use("/api/immunization", immunization_routes_1.default);
app.use("/api/parentContacts", parentContact_routes_1.default);
app.use("/api/collateralContacts", collateralContact_routes_1.default);
app.use("/api/contactNotes", contactNote_routes_1.default);
app.use("/api/educationBackground", educationBackground_routes_1.default);
app.use("/api/employment", employment_routes_1.default);
app.use("/api/socialDeterminants", socialDeterminants_routes_1.default);
app.use("/api/clientSignature", clientSignature_routes_1.default);
app.use("/api/parentSignature", parentSignature_routes_1.default);
app.use("/api/treatmentPlan", treatmentPlan_routes_1.default);
app.use("/api/treatmentGoals", treatmentGoals_routes_1.default);
app.use("/api/treatmentObjective", treatmentObjective_routes_1.default);
app.use("/api/treatmentIntervention", treatmentIntervention_routes_1.default);
app.use("/api/discharge", discharge_routes_1.default);
app.use("/api/medicalHistory", mediaclHistory_routes_1.default);
app.use("/api/familyMedicalHistory", familyMedicalHistory_routes_1.default);
app.use("/api/message", message_routes_1.default);
app.use("/api/conversations", conversation_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/staffs", staff_routes_1.default);
(0, message_socket_1.default)(io);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs));
//# sourceMappingURL=app.js.map