import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Order } from "./orders.entity";
import { Product } from "src/products/products.entity";

@Entity({name: 'ORDER_DETAILS'})
export class OrderDetails {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
        * @description Precio del producto con un min de 2 decimales.
        * @example 299.99
    */
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    price: number;
    
    // Relación N:N con products.
    @ManyToMany(() => Product, (product) => product.orderDetails)
    @JoinTable({name: 'ORDER_DETAILS_PRODUCTS'})
    products: Product[];

    // order_id: Relación 1:1 con orders.
    @OneToOne(() => Order, (order) => order.orderDetails)
    @JoinColumn({name: 'order_id'})
    order: Order;


}