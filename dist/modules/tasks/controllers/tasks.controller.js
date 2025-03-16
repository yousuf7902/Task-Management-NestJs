"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("../services/tasks.service");
const create_task_dto_1 = require("../dto/create-task.dto");
const update_task_dto_1 = require("../dto/update-task-dto");
const send_response_utils_1 = require("../../../utils/send-response.utils");
let TasksController = class TasksController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async getAllTasks(status, req, res) {
        try {
            const data = await this.taskService.findAllTasks(status);
            if (!status) {
                (0, send_response_utils_1.sendResponse)(res, 200, 'Data fetched successfully...', data);
            }
            (0, send_response_utils_1.sendResponse)(res, 200, 'Task filtered successfully...', data);
        }
        catch (error) {
            throw error;
        }
    }
    async createTasks(createTaskDto, req, res) {
        try {
            const data = await this.taskService.create(createTaskDto);
            (0, send_response_utils_1.sendResponse)(res, 201, "Task created successfully...", data);
        }
        catch (error) {
            throw error;
        }
    }
    async getTaskById(id, req, res) {
        try {
            const data = await this.taskService.findById(id);
            (0, send_response_utils_1.sendResponse)(res, 200, "Task fetched successfully...", data);
        }
        catch (error) {
            throw error;
        }
    }
    async updateTask(id, updateTaskDto, req, res) {
        try {
            const data = await this.taskService.update(id, updateTaskDto);
            (0, send_response_utils_1.sendResponse)(res, 200, "Task updated successfully...", data);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteTask(id, req, res) {
        try {
            const data = await this.taskService.delete(id);
            (0, send_response_utils_1.sendResponse)(res, 200, "Task deleted successfully...", data);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("status")),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTasks", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskById", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_task_dto_1.UpdateTaskDto, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTask", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)("tasks"),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map