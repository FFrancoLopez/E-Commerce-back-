import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from './dto/CreateUserDto.dto';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private excludePassword(user: User): Partial<User> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async getPaginatedUsers(page: number, limit: number): Promise<{ page: number; limit: number; totalUsers: number; totalPages: number; users: Partial<User>[]; }> {
    const [users, totalUsers] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    if (!users.length) throw new NotFoundException("No se encontraron usuarios en la página solicitada.");

    return {
      page,
      limit,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      users: users.map(this.excludePassword),
    };
    
  }

  async getAllUsers(): Promise<Partial<User>[]> {

    const users = await this.usersRepository.find();

    if (!users.length) throw new NotFoundException("No se encontraron usuarios.");

    return users.map(this.excludePassword);
  }
  
  async getUserById(id: string): Promise<Partial<User> | null> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    return this.excludePassword(user);
  }

  async createUser(user: CreateUserDto) {
    const existingUser = await this.findUserByEmail(user.email);
    if (existingUser) throw new ConflictException(`El email ${user.email} ya está registrado.`);
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async updateUser(id: string, updatedData: Partial<User>): Promise<User | null> {
    const user = await this.usersRepository.preload({
      id,
      ...updatedData,
    });

    if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);

    return await this.usersRepository.save(user);
  }

  async deleteUser(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);

    await this.usersRepository.remove(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> { 
    return await this.usersRepository.findOne({ where: { email } });
  }

}