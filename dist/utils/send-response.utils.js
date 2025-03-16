"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        statusCode,
        message,
        data,
    });
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=send-response.utils.js.map