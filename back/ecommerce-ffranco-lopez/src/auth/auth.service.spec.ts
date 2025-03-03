import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { User } from "../users/users.entity";
import { getRepositoryToken } from "@nestjs/typeorm";


describe('AuthService', () => {
    let service: AuthService;
    let usersRepository: Repository<User>;

    beforeEach(async () => {
        const mockUsersRepository = {
            findOne: Promise.resolve(null),
            save: (User: Partial<User>) => Promise.resolve({...User, password: "password"}),
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, JwtService, {
                provide: getRepositoryToken(User),
                useValue: mockUsersRepository
            }],

        }).compile();

        service = module.get<AuthService>(AuthService);
    })

    it ("El servico AuthService debe estar definido", () => {
        expect(service).toBeDefined();
    })

    it ( "El servicio crea un usuario y devuelve el token", )
})