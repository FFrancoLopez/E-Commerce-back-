import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./products.entity";
import * as data from '../data.json';
import { Repository } from "typeorm";
import { Category } from "src/categories/categories.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()

export class ProductsService { 
      
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private readonly categoriesService: Repository<Category>,
    ) {}
     
    async addProducts(): Promise<string> {
        const categories = await this.categoriesService.find()

        for (const element of data) {

            const category = categories.find( (c) => c.name === element.category);

            if (!category){
                throw new BadRequestException(`La categoría ${element.category} no existe.`);
            }
            const product = new Product();
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.stock = element.stock;
            product.category = category;

            await this.productsRepository.createQueryBuilder().insert().into(Product).values(product).orUpdate([ 'description', 'price', 'stock'], ['name']).execute();
        };
        return 'Productos creados exitosamente.';

    }


    async getPaginatedProducts(page: number, limit: number) {
        const [products, totalProducts] = await this.productsRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        const totalPages = Math.ceil(totalProducts / limit);
        return { page, limit, totalProducts, totalPages, products };
    }

    async getProducts(): Promise< Product[]> {
        return await this.productsRepository.find();
    }

    async getProductById(id: string): Promise< Product | null> {
        const product = await this.productsRepository.findOne({where: {id} });

        if (!product) throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
        return product;
    }

    async createProduct(product: Partial<Product>): Promise<Product> {
        const existingProduct = await this.productsRepository.findOne({
          where: { name: product.name },
        });

        if(existingProduct) throw new BadRequestException(`El producto ${product.name} ya existe.`);
        
        const newProduct = this.productsRepository.create(product);
        return await this.productsRepository.save(newProduct);
    }
        

    async updateProduct(id: string, updatedData: Partial<Product>): Promise <Partial<Product> | null> {
        const product = await this.productsRepository.findOne({where: {id} });

        if ( !product ) throw new NotFoundException(`Producto con ID ${id} no encontrado.`);

        Object.assign(product, updatedData);
        return await this.productsRepository.save(product);
    }

    async deleteProduct(id: string): Promise<Product | null> {
        const product = await this.productsRepository.findOne({where: {id} });

        if ( !product ) throw new NotFoundException(`Producto con ID ${id} no encontrado.`);

        await this.productsRepository.delete(id);
        return product;
    }

}