"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)({ path: '.env.development' });
const config = {
    type: 'postgres',
    database: `${process.env.DB_NAME}`,
    host: `${process.env.DB_HOST}` || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts, .js}'],
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
};
exports.default = (0, config_1.registerAs)('typeorm', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeorm.js.map