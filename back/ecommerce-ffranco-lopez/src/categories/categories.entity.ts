import { Product } from "src/products/products.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity({name: 'CATEGORIES'})
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * @description Nombre de la categoría con un máximo de 50 caracteres.
     * @example smartphone
    */ 
    @Column({type: 'varchar', length: 50, nullable: false, unique: true})
    name: string;

    // Relación: N:1 con products.
    @OneToMany(() => Product, (product) => product.category)
    @JoinColumn()
    products: Product[];
}