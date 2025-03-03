import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/CreateUserDto.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    private excludePassword;
    getPaginatedUsers(page: number, limit: number): Promise<{
        page: number;
        limit: number;
        totalUsers: number;
        totalPages: number;
        users: Partial<User>[];
    }>;
    getAllUsers(): Promise<Partial<User>[]>;
    getUserById(id: string): Promise<Partial<User> | null>;
    createUser(user: CreateUserDto): Promise<User>;
    updateUser(id: string, updatedData: Partial<User>): Promise<User | null>;
    deleteUser(id: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
}
