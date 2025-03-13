import { TypeOrmModuleOptions } from '@nestjs/typeorm';
declare class DatabaseConfigService {
    private env;
    constructor(env: {
        [k: string]: string | undefined;
    });
    getTypeOrmConfig(): TypeOrmModuleOptions;
}
declare const dbConfigService: DatabaseConfigService;
export default dbConfigService;
