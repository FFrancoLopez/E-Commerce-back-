import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { OrderDetails } from './ordersDetails.entity';
import { Product } from 'src/products/products.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OrdersService {
  constructor(

    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,

    @InjectRepository(OrderDetails)
    private readonly orderDetailRepository: Repository<OrderDetails>,

    private readonly usersService: UsersService,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addOrder(userId: string, products: { id: string }[]): Promise<Order> {
    // Verificar si el usuario existe
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('El usuario no existe.');
    }

    // Crear una nueva orden
    const order = this.ordersRepository.create({ user, date: new Date() });
    await this.ordersRepository.save(order);

    // Procesar productos en paralelo
    const orderDetails = await Promise.all(
      products.map(async (productData) => {
        const product = await this.productRepository.findOne({
          where: { id: productData.id, stock: MoreThan(0) },
        });

        if (!product) {
          throw new NotFoundException('El producto no existe.');
        };

        const orderDetail = this.orderDetailRepository.create({
          order,
          price: product.price,
          products: [product],
        });

        product.stock -= 1; // Reducir stock
        await this.productRepository.save(product); // Guardar el cambio de stock

        await this.orderDetailRepository.save(orderDetail); // Guardar detalle de la orden
        return orderDetail;
      }),
    );

    // Calcular total de la orden
    const total = orderDetails
      .filter((detail) => detail) // Filtrar detalles válidos
      .reduce((sum, detail) => sum + detail.price, 0);

    return await this.ordersRepository.save(order);
  }


  
  async getOrder(id: string): Promise<{
    id: string;
    date: Date;
    user: { id: string; name: string };
    orderDetails: {
      price: number;
      products: { id: string; name: string; description: string; price: number }[];
    };
  }>{
    
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['orderDetails', 'orderDetails.products', 'user'],
    });

    if (!order) {
      throw new NotFoundException('La orden no existe.');
    }

    // Mapear los detalles de la orden
    const orderDetails = {
      price: order.orderDetails.price,
      products: (order.orderDetails.products || []).map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
      })),
    };

    return {
      id: order.id,
      date: order.date,
      user: {
        id: order.user.id,
        name: order.user.name,
      },
      orderDetails,
    };

  }
  
}
