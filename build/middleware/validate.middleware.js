"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            console.log("Validation errors:", error);
            console.log("body request:", req.body);
            res.status(400).json({
                error: "The request cannot be fulfilled due to bad syntax",
                details: error.details.map((d) => d.message),
            });
            return;
        }
        next();
    };
};
exports.validateRequest = validateRequest;
//# sourceMappingURL=validate.middleware.js.map