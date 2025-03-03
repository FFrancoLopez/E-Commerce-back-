// import { Injectable } from '@nestjs/common';
// import { User } from './users.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export class UsersRepository {
//   constructor(
//     @InjectRepository(User)
//     private readonly usersRepository: Repository<User>,
//   ){}
  

//   async findUserByEmail(email: string): Promise<User | null> { 
//     return await this.usersRepository.findOne({ where: { email } });
//   }


//   // Obtener usuarios con paginación.
//   async getPaginatedUsers(page: number, limit: number): Promise<{ page: number; limit: number; totalUsers: number; totalPages: number; users: Partial<User>[]}> {
//     const [users, totalUsers] = await this.usersRepository.findAndCount({
//       skip: (page - 1) * limit,
//       take: limit,
//     });

//     const totalPages = Math.ceil(totalUsers / limit);

//     // Excluir la contraseña y devolver solo lo necesario.
//     const usersWithoutPassword = users.map(this.excludePassword);

//     return {
//       page,
//       limit,
//       totalUsers,
//       totalPages,
//       users: usersWithoutPassword,
//     };
//   }

//   // Excluir la contraseña del usuario.
//   private excludePassword(user: User): Partial<User> {
//     const { password, ...userWithoutPassword } = user;
//     return userWithoutPassword;
//   }
  
//   // Obtener todos los usuarios sin la contraseña.
//   async getAllUsers(): Promise<Partial<User>[]> {
//     const users = await this.usersRepository.find();
//     return users.map(this.excludePassword);
//   }

//   // Obtener un usuario por ID, incluyendo sus órdenes.
//   async getUserById(id: string): Promise<Partial<User> | null> {
//     const user = await this.usersRepository.findOne({
//       where: { id },
//       relations: ['orders'], // Incluir órdenes asociadas.
//     });

//     if (!user) return null;

//     // Excluir la contraseña y devolver solo id y date de las órdenes.
//     const userWithOrders = this.excludePassword(user);
//     userWithOrders.orders = user.orders.map(order => ({
//       id: order.id,
//       date: order.date,
//       user: order.user,
//       orderDetails: order.orderDetails,
      
//     }));

//     return userWithOrders;
//   }
  

//   // Crear un nuevo usuario.
//   async createUser(user: Omit<User, 'id'>): Promise<User> {
//     const newUser = this.usersRepository.create(user);
//     return await this.usersRepository.save(newUser);
//   }
  
//   // Actualizar un usuario por ID.
//   async updateUser(id: string, updatedData: Partial<User>): Promise<User | null> {
//     const user = await this.usersRepository.preload({
//       id,
//       ...updatedData,
//     });

//     if (!user) return null;

//     return await this.usersRepository.save(user);
//   }
  
//   // Eliminar un usuario por ID.
//   async deleteUser(id: string): Promise<User | null> {
//     const user = await this.usersRepository.findOne({ where: { id } });

//     if (!user) return null;

//     await this.usersRepository.remove(user);
//     return user;
//   }

// }