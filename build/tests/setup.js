"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
beforeAll(async () => {
    await database_1.default.$connect();
});
afterAll(async () => {
    await database_1.default.$disconnect();
});
afterEach(async () => {
    const tables = ['User'];
    await Promise.all(tables.map(table => database_1.default.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE`)));
});
//# sourceMappingURL=setup.js.map