import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUserDto.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(page?: string, limit?: string): Promise<{
        page: number;
        limit: number;
        totalUsers: number;
        totalPages: number;
        users: Partial<import("./users.entity").User>[];
    } | Partial<import("./users.entity").User>[]>;
    getUserById(id: string): Promise<Partial<import("./users.entity").User>>;
    createUser(createUserDto: CreateUserDto): Promise<import("./users.entity").User>;
    updateUser(id: string, createUserDto: CreateUserDto): Promise<import("./users.entity").User>;
    deleteUser(id: string): Promise<import("./users.entity").User>;
}
