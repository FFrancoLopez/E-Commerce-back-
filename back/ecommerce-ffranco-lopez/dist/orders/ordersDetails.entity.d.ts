import { Order } from "./orders.entity";
import { Product } from "src/products/products.entity";
export declare class OrderDetails {
    id: string;
    price: number;
    products: Product[];
    order: Order;
}
