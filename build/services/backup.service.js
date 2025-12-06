"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupService = void 0;
const client_1 = require("@prisma/client");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class BackupService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.backupDir = path_1.default.join(__dirname, '../../backups');
        if (!fs_1.default.existsSync(this.backupDir)) {
            fs_1.default.mkdirSync(this.backupDir);
        }
    }
    async createBackup() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const users = await this.prisma.user.findMany();
        const backup = {
            timestamp,
            data: users
        };
        fs_1.default.writeFileSync(path_1.default.join(this.backupDir, `backup-${timestamp}.json`), JSON.stringify(backup, null, 2));
    }
}
exports.BackupService = BackupService;
//# sourceMappingURL=backup.service.js.map