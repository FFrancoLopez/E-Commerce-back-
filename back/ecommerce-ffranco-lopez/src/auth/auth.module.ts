import { Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        UsersModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})

export class AuthModule {}