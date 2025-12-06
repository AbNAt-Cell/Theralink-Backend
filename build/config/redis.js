"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UPSTASH_REDIS_REST_URL = process.env.IO_REDIS_URL;
if (!UPSTASH_REDIS_REST_URL) {
    console.log("missing UPSTASH_REDIS_REST_URL");
    process.exit(1);
}
const redisClient = new ioredis_1.default(UPSTASH_REDIS_REST_URL);
exports.default = redisClient;
//# sourceMappingURL=redis.js.map