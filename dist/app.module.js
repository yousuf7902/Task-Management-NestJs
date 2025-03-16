"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const tasks_module_1 = require("./modules/tasks/tasks.module");
const database_config_1 = require("./config/database.config");
const tasks_controller_1 = require("./modules/tasks/controllers/tasks.controller");
const tasks_service_1 = require("./modules/tasks/services/tasks.service");
const task_entity_1 = require("./modules/tasks/entities/task.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                isGlobal: true,
            }), typeorm_1.TypeOrmModule.forRoot(database_config_1.default.getTypeOrmConfig()), typeorm_1.TypeOrmModule.forFeature([task_entity_1.Task]), tasks_module_1.TasksModule],
        controllers: [tasks_controller_1.TasksController],
        providers: [tasks_service_1.TasksService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map