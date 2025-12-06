"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Theralink API Documentation",
            version: "1.0.0",
            description: "API documentation for Theralink Healthcare Platform",
        },
        servers: [
            {
                url: "https://theralink-backend.onrender.com",
                description: "Production server",
            },
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
        components: {
            schemas: {
                SendMessageEvent: {
                    type: "object",
                    properties: {
                        toUserId: {
                            type: "string",
                            description: "Recipient user ID",
                        },
                        body: {
                            type: "string",
                            description: "Message content",
                        },
                        subject: {
                            type: "string",
                            description: "Message subject",
                        },
                    },
                },
                ReceiveMessageEvent: {
                    type: "object",
                    properties: {
                        fromUserId: {
                            type: "string",
                            description: "Sender user ID",
                        },
                        body: {
                            type: "string",
                            description: "Message content",
                        },
                        subject: {
                            type: "string",
                            description: "Message subject",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts", path_1.default.resolve(__dirname, "../docs/socketDoc.yml")],
};
exports.specs = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map