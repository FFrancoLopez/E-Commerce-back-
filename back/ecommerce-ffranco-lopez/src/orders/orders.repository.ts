// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { MoreThan, Repository } from 'typeorm';
// import { Order } from './orders.entity';
// import { OrderDetails } from './ordersDetails.entity';
// import { User } from 'src/users/users.entity';
// import { Product } from 'src/products/products.entity';

// @Injectable()
// export class OrdersRepository {
//   constructor(
//     @InjectRepository(Order)
//     private readonly orderRepository: Repository<Order>,

//     @InjectRepository(OrderDetails)
//     private readonly orderDetailRepository: Repository<OrderDetails>,

//     @InjectRepository(User)
//     private readonly userRepository: Repository<User>,

//     @InjectRepository(Product)
//     private readonly productRepository: Repository<Product>,
//   ) {}

//   async addOrder(userId: string, products: { id: string }[]): Promise<Order> {
//     // Verificar si el usuario existe
//     const user = await this.userRepository.findOne({ where: { id: userId } });
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     // Crear una nueva orden
//     const order = this.orderRepository.create({ user, date: new Date() });
//     await this.orderRepository.save(order);

//     let total = 0;

//     for (const productData of products) {
//       // Verificar si el producto existe y tiene stock
//       const product = await this.productRepository.findOne({
//         where: { id: productData.id, stock: MoreThan(0) }, // Filtrar productos con stock mayor a 0
//       });

//       if (!product) continue;

//       // Crear un detalle de la orden
//       const orderDetail = this.orderDetailRepository.create({
//         order,
//         price: product.price,
//         products: [product],
//       });

//       await this.orderDetailRepository.save(orderDetail);

//       // Actualizar total y reducir stock
//       total += product.price;
//       product.stock -= 1;
//       await this.productRepository.save(product);
//     }

   
//     await this.orderRepository.save({ ...order, total });

//     return order;
//   }

//   async getOrder(id: string): Promise<Partial<Order>> {
//     const order = await this.orderRepository.findOne({
//       where: { id },
//       relations: ['orderDetails', 'orderDetails.products', 'user'],
//     });

//     if (!order) {
//       throw new NotFoundException('Order not found');
//     }

//     return order;
//   }
// }
