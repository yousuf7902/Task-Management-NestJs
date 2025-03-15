"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongTaskStatusException = void 0;
class WrongTaskStatusException extends Error {
    constructor() {
        super("Wrong task status transition!...");
        this.name = "WrongTaskStatusException";
    }
}
exports.WrongTaskStatusException = WrongTaskStatusException;
//# sourceMappingURL=wrong-task-status-exception.js.map