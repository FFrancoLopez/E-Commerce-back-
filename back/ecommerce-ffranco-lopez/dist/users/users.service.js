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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./users.entity");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    excludePassword(user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async getPaginatedUsers(page, limit) {
        const [users, totalUsers] = await this.usersRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        if (!users.length)
            throw new common_1.NotFoundException("No se encontraron usuarios en la página solicitada.");
        return {
            page,
            limit,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            users: users.map(this.excludePassword),
        };
    }
    async getAllUsers() {
        const users = await this.usersRepository.find();
        if (!users.length)
            throw new common_1.NotFoundException("No se encontraron usuarios.");
        return users.map(this.excludePassword);
    }
    async getUserById(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['orders'],
        });
        if (!user)
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado.`);
        return this.excludePassword(user);
    }
    async createUser(user) {
        const existingUser = await this.findUserByEmail(user.email);
        if (existingUser)
            throw new common_1.ConflictException(`El email ${user.email} ya está registrado.`);
        const newUser = this.usersRepository.create(user);
        return await this.usersRepository.save(newUser);
    }
    async updateUser(id, updatedData) {
        const user = await this.usersRepository.preload({
            id,
            ...updatedData,
        });
        if (!user)
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado.`);
        return await this.usersRepository.save(user);
    }
    async deleteUser(id) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user)
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado.`);
        await this.usersRepository.remove(user);
        return user;
    }
    async findUserByEmail(email) {
        return await this.usersRepository.findOne({ where: { email } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map