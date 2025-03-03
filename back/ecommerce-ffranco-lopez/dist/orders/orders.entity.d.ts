import { User } from "src/users/users.entity";
import { OrderDetails } from "./ordersDetails.entity";
export declare class Order {
    id: string;
    date: Date;
    orderDetails: OrderDetails;
    user: Partial<User>;
}
