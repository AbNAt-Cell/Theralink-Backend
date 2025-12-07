"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const backup_service_1 = require("./services/backup.service");
const backupService = new backup_service_1.BackupService();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
setInterval(() => {
    backupService.createBackup();
}, 24 * 60 * 60 * 1000);
backupService.createBackup();
app_1.httpServer.listen({
    port: Number(PORT),
    host: "0.0.0.0",
}, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map