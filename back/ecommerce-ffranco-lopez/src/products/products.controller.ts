import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../guards/auth.guard';
import { Product } from './products.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('products')
export class ProductsController {
    
    constructor(private readonly productsService: ProductsService) {}


    // Seeder para productos.
    @HttpCode(201)
    @Get('seeder')
    async seedProducts(): Promise<string> {
        return await this.productsService.addProducts();
    }

    //Devuelve todos los productos con o sin paginación.
    @HttpCode(200)
    @Get()
    async getProducts(
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ){
        try{
            if (page && limit){
                const pageNumber = parseInt(page, 10) || 1;
                const limitNumber = parseInt(limit, 10) ||  5;

                if (isNaN(pageNumber) || isNaN(limitNumber)){
                    throw new BadRequestException("Los parametros de la paginación debern ser números válidos.");
                }

                return await this.productsService.getPaginatedProducts(pageNumber, limitNumber);
            }
            return await this.productsService.getProducts();

        }catch (error){
            throw error;
        }
    }
 
    //Devuelve el producto con el id pedido.
    @HttpCode(200)
    @Get(':id')
    async getProductById( @Param('id', ParseUUIDPipe) id: string ){
        const product = await this.productsService.getProductById( id ); 

        if (!product) throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
        return product;
    }


    //Crea un nuevo producto.
    @HttpCode(201)
    @Post()
    async createProduct( @Body() product: Partial<Product> ){
        try{
            return await this.productsService.createProduct(product);
        }catch (error){
            throw error;
        }  
    }
    
    //Actualiza los campos de un producto.
    @ApiBearerAuth()
    @HttpCode(200)
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard)
    async updateProduct( @Param('id', ParseUUIDPipe) id: string, @Body() product: Partial<Product> ): Promise <Partial<Product> | null> {

        const updatedProduct = await this.productsService.updateProduct(id, product);

        if (!updatedProduct) throw new NotFoundException(`Producto con ID ${id} no encontrado.`);

        return updatedProduct;
    }


    // Elimina un producto.
    @ApiBearerAuth()
    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteProduct( @Param('id', ParseUUIDPipe) id: string ) {
        const deletedProduct = await this.productsService.deleteProduct(id);

        if (!deletedProduct) throw new NotFoundException(`Producto con ID ${id} no encontrado.`);

        return deletedProduct;
    }


}
 