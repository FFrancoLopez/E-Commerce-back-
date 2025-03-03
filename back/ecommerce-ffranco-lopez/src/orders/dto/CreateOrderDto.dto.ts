import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Product } from "src/products/products.entity";


export class CreateOrderDto {
    
    /**
     * @description ID del usuario que realiza la orden.
     * @example '7fcea4b2-e57d-4f18-b2cc-7dc5cc3af982'
    */
    @IsNotEmpty()
    @IsUUID()
    userId: string;
    
    /**
     * @description Productos a comprar.
     * @example [{id:'37174222-43b9-45d6-ab25-10f6c2d8c3ad'}]
    */
    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Product[]>;
}

