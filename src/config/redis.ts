import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();
const UPSTASH_REDIS_REST_URL = process.env.IO_REDIS_URL;

if (!UPSTASH_REDIS_REST_URL) {
  console.log("missing UPSTASH_REDIS_REST_URL");
  process.exit(1);
}
// Create a new Upstash Redis client
const redisClient = new Redis(UPSTASH_REDIS_REST_URL);

export default redisClient;