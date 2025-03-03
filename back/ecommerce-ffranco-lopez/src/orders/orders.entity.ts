import { User } from "src/users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { OrderDetails } from "./ordersDetails.entity";

@Entity({name: 'ORDERS'})
export class Order {

    /**
        *@description ID de la orden.
        *@example 'd2718621-b174-44b4-a8ed-b1d277c14301'
    */
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;

    // Relación 1:1 con orderDetails.
    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails;
    
    // user_id:  (Relación 1:N) con users.
    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({name: 'userId'})
    user: Partial<User>;
}