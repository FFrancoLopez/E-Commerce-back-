import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class CreateProductDto {
  /**
   * @description Nombre del producto con un maximo de 50 caracteres.
   * @example 'Samsung G10'
  */
 @IsNotEmpty()
   @IsString()
   @Length(50)
  name: string;

  /**
   * @description Descripción del producto con un maximo de 255 caracteres.
   * @example 'The best monitor in the world.'
  */
    @IsNotEmpty()
    @IsString()
  description: string;

  /**
   * @description Precio del producto con un máximo de 2 decimales.
   * @example 299.99
  */
  @IsNotEmpty()
  @IsNumber()
  price: number;

  /**
   * @description Cantidad de productos que se pueden comprar.
   * @example 12
  */
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  /**
   * @description URL de la imagen del producto.
   * @example https://example.com/image.jpg
  */
  @IsOptional()
  @IsString()
  imgUrl: string;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el producto.',
    example: 'd2c2f282-4c4b-4f15-9c41-2e6aef594cfb',
  })
  /**
   * @description ID de la categoría a la que pertenece el producto.
   * @example a9f646da-437b-469e-ba02-3385a707f578
  */
  @IsNotEmpty()
  @IsString()
  category: string;
}
