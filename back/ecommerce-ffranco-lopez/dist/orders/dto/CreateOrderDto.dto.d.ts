import { Product } from "src/products/products.entity";
export declare class CreateOrderDto {
    userId: string;
    products: Partial<Product[]>;
}
