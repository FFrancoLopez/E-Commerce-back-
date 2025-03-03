import { Category } from "src/categories/categories.entity";
import { OrderDetails } from "src/orders/ordersDetails.entity";
export declare class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    category: Category;
    orderDetails: OrderDetails[];
}
