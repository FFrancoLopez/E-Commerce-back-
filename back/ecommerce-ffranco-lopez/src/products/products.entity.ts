import { Category } from "src/categories/categories.entity";
import { OrderDetails } from "src/orders/ordersDetails.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'PRODUCTS'})
export class Product {
    
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * @description Nombre del producto con un maximo de 50 caracteres.
   * @example 'Samsung Odyssey G9'
  */
  @Column({type: 'varchar', length: 50, nullable: false, unique: true})
  name: string;

  /**
   * @description Descripción del producto con un maximo de 255 caracteres.
   * @example 'The best monitor in the world.'
  */
  @Column({type: 'text', nullable: false})
  description: string;

  /**
   * @description Precio del producto con un min de 2 decimales.
   * @example 299.99
  */
  @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
  price: number;

  /**
   * @description Cantidad de productos que se pueden comprar.
   * @example 12
  */
  @Column({type: 'int', nullable: false})
  stock: number;

  /**
   * @description URL de la imagen del producto.
   * @example https://example.com/image.jpg
  */
  @Column({type: 'text', default: 'https://example.com/image.jpg'})
  imgUrl: string;

  
  // category_id  (Relación 1:N).
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({name: 'category_id'})
  category: Category;

  
  // Relación N:N con orderDetails.
  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails: OrderDetails[];
}