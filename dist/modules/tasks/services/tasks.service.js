"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
let TasksService = class TasksService {
    constructor() {
        this.tasks = [];
    }
    async findAllTasks() {
        return this.tasks;
    }
    create(createTaskDto) {
        const task = {
            id: (0, crypto_1.randomInt)(1000),
            ...createTaskDto,
        };
        this.tasks.push(task);
        return task;
    }
    async update(id, updateTaskDto) {
        const task = this.tasks.find((task) => task.id === id);
        if (!task) {
        }
        console.log(task);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map