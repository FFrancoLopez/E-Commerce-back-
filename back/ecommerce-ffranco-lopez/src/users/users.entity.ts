import { Order } from "../orders/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({name: 'USERS'})
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    /**
        *@description Nombre del usuario con al min. 3 caracteres y máximo 80.
        *@example Juan
    */
    @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

    /**
    * @description La edad del usuario debe ser de al menos 2 digitos.
    * @example 20
    */
    @Column({type: 'bigint', nullable: false})
    age: number

    /**
        * @description Debe ser un email válido.
        * @example juan@gmail.com
    */
    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    email: string;
    
    /**
        * @description La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número, un carácter especial y entre 8 y 15 caracteres.
        * @example Ab123456!
    */
    @Column({ type: 'varchar', nullable: false })
    password: string;
    
    /**
        * @description Numero telefonico válido del usuario.
        * @example 1223456789
    */
    @Column( {type:'bigint', nullable: true} )
    phone: number;

    /**
        * @description País del usuario con min. 5 caracteres y máximo 20.
        * @example Argentina
    */
    @Column({ type: 'varchar', length:50, nullable: true })
    country: string;

    /**
        * @description Dirección del usuario con al min. 3 caracteres y máximo 80.
        * @example Calle-123
    */
    @Column({type: 'text', nullable: true})
    address: string;

    /**
        * @description Cuidad del usuario con min. 5 caracteres y máximo 20.
        * @example Córdoba
    */
    @Column({ type: 'varchar', length: 50, nullable: true })
    city: string;

    /**
        * @description Si el usuario es administrador, es true, caso contrario es false (por defecto).
        * @example false
    */
    @Column({ type: 'boolean', default: false})
    isAdmin: boolean;

    // orders_id: Relación 1:N con orders.
    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}

