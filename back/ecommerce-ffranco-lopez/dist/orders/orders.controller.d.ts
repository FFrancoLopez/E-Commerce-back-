import { CreateOrderDto } from './dto/CreateOrderDto.dto';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    addOrder(createOrderDto: CreateOrderDto): Promise<import("./orders.entity").Order>;
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
