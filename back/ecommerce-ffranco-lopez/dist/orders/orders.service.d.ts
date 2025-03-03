import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { OrderDetails } from './ordersDetails.entity';
import { Product } from 'src/products/products.entity';
import { UsersService } from 'src/users/users.service';
export declare class OrdersService {
    private readonly ordersRepository;
    private readonly orderDetailRepository;
    private readonly usersService;
    private readonly productRepository;
    constructor(ordersRepository: Repository<Order>, orderDetailRepository: Repository<OrderDetails>, usersService: UsersService, productRepository: Repository<Product>);
    addOrder(userId: string, products: {
        id: string;
    }[]): Promise<Order>;
    getOrder(id: string): Promise<{
        id: string;
        date: Date;
        user: {
            id: string;
            name: string;
        };
        orderDetails: {
            price: number;
            products: {
                id: string;
                name: string;
                description: string;
                price: number;
            }[];
        };
    }>;
}
