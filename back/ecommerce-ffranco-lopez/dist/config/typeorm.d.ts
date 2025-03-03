import { DataSource } from "typeorm";
declare const _default: (() => {
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    entities: string[];
    migrations: string[];
    autoLoadEntities: boolean;
    synchronize: boolean;
    logging: boolean;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    type: string;
    database: string;
    host: string;
    port: number;
    username: string;
    password: string;
    entities: string[];
    migrations: string[];
    autoLoadEntities: boolean;
    synchronize: boolean;
    logging: boolean;
}>;
export default _default;
export declare const connectionSource: DataSource;
