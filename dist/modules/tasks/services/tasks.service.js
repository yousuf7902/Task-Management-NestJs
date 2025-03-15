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
const task_model_1 = require("../model/task.model");
const crypto_1 = require("crypto");
const wrong_task_status_exception_1 = require("../../../exceptions/wrong-task-status-exception");
let TasksService = class TasksService {
    constructor() {
        this.tasks = [];
    }
    async findAllTasks() {
        return this.tasks;
    }
    async findById(id) {
        const task = this.tasks.find((task) => task.id === id);
        if (!task) {
            throw new common_1.NotFoundException("Task not found....");
        }
        return task;
    }
    async filterTask(status) {
        const tasks = this.tasks.filter((task) => task.status === status);
        if (tasks.length === 0) {
            throw new common_1.NotFoundException("Task not found....");
        }
        return tasks;
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
        const taskIndex = this.tasks.findIndex((task) => task.id === id);
        if (taskIndex < 0) {
            throw new common_1.NotFoundException("Task not found...");
        }
        if (updateTaskDto.status && !this.isValidStatus(this.tasks[taskIndex].status, updateTaskDto.status)) {
            throw new wrong_task_status_exception_1.WrongTaskStatusException();
        }
        const updateTask = { ...this.tasks[taskIndex], ...updateTaskDto };
        this.tasks[taskIndex] = updateTask;
        return updateTask;
    }
    isValidStatus(currentStatus, newStatus) {
        const allowedStatus = [
            task_model_1.TaskStatus.OPEN,
            task_model_1.TaskStatus.IN_PROGRESS,
            task_model_1.TaskStatus.DONE
        ];
        return allowedStatus.indexOf(currentStatus) <= allowedStatus.indexOf(newStatus);
    }
    delete(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        return this.tasks;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map