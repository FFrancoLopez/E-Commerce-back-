"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(usersService, usersRepository, jwtService) {
        this.usersService = usersService;
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async signup(user) {
        const existingUser = await this.usersService.findUserByEmail(user.email);
        if (existingUser) {
            throw new common_1.BadRequestException("El email ya está registrado.");
        }
        ;
        const hashPassword = await bcrypt.hash(user.password, 10);
        const newUser = { ...user, password: hashPassword };
        const saveUser = await this.usersRepository.save(newUser);
        const { password, ...userWithoutPassword } = saveUser;
        const payload = {
            id: saveUser.id,
            email: saveUser.email,
            isAdmin: saveUser.isAdmin
        };
        const token = this.jwtService.sign(payload);
        return { user: userWithoutPassword, token };
    }
    async signIn(email, password) {
        const user = await this.usersRepository.createQueryBuilder('user').where('LOWER(user.email) = :email', { email: email.toLowerCase() }).getOne();
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.NotFoundException("Email o contraseña incorrecta.");
        }
        const payload = {
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
        };
        const token = this.jwtService.sign(payload);
        return {
            token,
            message: "Usuario loggeado con éxito."
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map