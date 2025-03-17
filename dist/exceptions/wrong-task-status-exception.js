"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongTaskStatusException = void 0;
const common_1 = require("@nestjs/common");
class WrongTaskStatusException extends common_1.HttpException {
    constructor() {
        super("Wrong task status transition!...", 400);
    }
}
exports.WrongTaskStatusException = WrongTaskStatusException;
//# sourceMappingURL=wrong-task-status-exception.js.map