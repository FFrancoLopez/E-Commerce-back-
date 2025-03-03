import { Order } from "../orders/orders.entity";
export declare class User {
    id: string;
    name: string;
    age: number;
    email: string;
    password: string;
    phone: number;
    country: string;
    address: string;
    city: string;
    isAdmin: boolean;
    orders: Order[];
}
