"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
class DatabaseConfigService {
    constructor(env) {
        this.env = env;
    }
    getTypeOrmConfig() {
        return {
            type: 'mysql',
            host: this.env.DB_HOST,
            port: Number(this.env.DB_PORT),
            username: this.env.DB_USERNAME,
            password: this.env.DB_PASSWORD,
            database: this.env.DB_NAME,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: false,
        };
    }
}
const dbConfigService = new DatabaseConfigService(process.env);
exports.default = dbConfigService;
//# sourceMappingURL=database.config.js.map