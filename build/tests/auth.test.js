"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
describe('Authentication API', () => {
    describe('POST /api/auth/signup', () => {
        it('should validate signup request', async () => {
            const response = await (0, supertest_1.default)(app_1.httpServer)
                .post('/api/auth/signup')
                .send({
                email: 'test@theralink.com',
                role: 'CLIENT'
            });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('token');
            expect(response.body.user).toHaveProperty('email');
            expect(response.body.user).toHaveProperty('role');
        });
        it('should reject invalid signup data', async () => {
            const response = await (0, supertest_1.default)(app_1.httpServer)
                .post('/api/auth/signup')
                .send({
                email: 'invalid-email',
                role: 'INVALID_ROLE'
            });
            expect(response.status).toBe(400);
        });
    });
    describe('POST /api/auth/login', () => {
        it('should validate login request', async () => {
            const response = await (0, supertest_1.default)(app_1.httpServer)
                .post('/api/auth/login')
                .send({
                username: 'testuser',
                password: 'password123'
            });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });
    });
});
//# sourceMappingURL=auth.test.js.map