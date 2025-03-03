import { UsersService } from "../users/users.service";
import { User } from "../users/users.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly usersService;
    private readonly usersRepository;
    private jwtService;
    constructor(usersService: UsersService, usersRepository: Repository<User>, jwtService: JwtService);
    signup(user: Partial<User>): Promise<{
        user: {
            id: string;
            name: string;
            age: number;
            email: string;
            phone: number;
            country: string;
            address: string;
            city: string;
            isAdmin: boolean;
            orders: import("../orders/orders.entity").Order[];
        };
        token: string;
    }>;
    signIn(email: string, password: string): Promise<{
        token: string;
        message: string;
    }>;
}
