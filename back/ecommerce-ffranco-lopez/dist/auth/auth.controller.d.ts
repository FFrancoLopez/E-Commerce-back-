import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/CreateUserDto.dto';
import { LoginUserDto } from './dto/LoginUserDto.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(user: CreateUserDto): Promise<{
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
    login(loginUSerDto: LoginUserDto): Promise<{
        message: string;
        token: {
            token: string;
            message: string;
        };
    }>;
}
