// import { Injectable } from '@nestjs/common';
// import { Product } from './products.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Category } from 'src/categories/categories.entity';
// import { CategoriesService } from 'src/categories/categories.service';

// @Injectable()
// export class ProductsRepository {
//     constructor(
//         @InjectRepository(Product)
//         private readonly productsRepository: Repository<Product>,

        
//         private readonly categoriesService: CategoriesService,
//     ) {}
    
//     private initialProducts = [
//         {
//           "name": "Iphone 15",
//           "description": "The best smartphone in the world",
//           "price": 199.99,
//           "stock": 12,
//           "category": "smartphone"
//         },
//         {
//           "name": "Samsung Galaxy S23",
//           "description": "The best smartphone in the world",
//           "price": 150.0,
//           "stock": 12,
//           "category": "smartphone"
//         },
//         {
//           "name": "Motorola Edge 40",
//           "description": "The best smartphone in the world",
//           "price": 179.89,
//           "stock": 12,
//           "category": "smartphone"
//         },
//         {
//           "name": "Samsung Odyssey G9",
//           "description": "The best monitor in the world",
//           "price": 299.99,
//           "stock": 12,
//           "category": "monitor"
//         },
//         {
//           "name": "LG UltraGear",
//           "description": "The best monitor in the world",
//           "price": 199.99,
//           "stock": 12,
//           "category": "monitor"
//         },
//         {
//           "name": "Acer Predator",
//           "description": "The best monitor in the world",
//           "price": 150.0,
//           "stock": 12,
//           "category": "monitor"
//         },
//         {
//           "name": "Razer BlackWidow V3",
//           "description": "The best keyboard in the world",
//           "price": 99.99,
//           "stock": 12,
//           "category": "keyboard"
//         },
//         {
//           "name": "Corsair K70",
//           "description": "The best keyboard in the world",
//           "price": 79.99,
//           "stock": 12,
//           "category": "keyboard"
//         },
//         {
//           "name": "Logitech G Pro",
//           "description": "The best keyboard in the world",
//           "price": 59.99,
//           "stock": 12,
//           "category": "keyboard"
//         },
//         {
//           "name": "Razer Viper",
//           "description": "The best mouse in the world",
//           "price": 49.99,
//           "stock": 12,
//           "category": "mouse"
//         },
//         {
//           "name": "Logitech G502 Pro",
//           "description": "The best mouse in the world",
//           "price": 39.99,
//           "stock": 12,
//           "category": "mouse"
//         },
//         {
//           "name": "SteelSeries Rival 3",
//           "description": "The best mouse in the world",
//           "price": 29.99,
//           "stock": 12,
//           "category": "mouse"
//         }
//     ];
//     // Método para cargar los productos iniciales
//     async preLoadProducts(): Promise<void> {
//         const existingProducts = await this.productsRepository.find();

//         if (existingProducts.length === 0) {
//             for (const productData of this.initialProducts) {
//                 // Buscar la categoría utilizando el repositorio inyectado directamente.
//                 let category = await this.categoriesService['categoriesService'].findOne({
//                     where: { name: productData.category },
//                 });

//                 // Si no existe, la creamos
//                 if (!category) {
//                     category = this.categoriesService['categoriesService'].create({ name: productData.category });
//                     category = await this.categoriesService['categoriesService'].save(category);
//                 }

//                 // Creacion del obj usando el repositorio inyectado.
//                 const product = this.productsRepository.create({
//                     ...productData,
//                     category,  // Asignamos la categoría al producto
//                 });

//                 // Guardamos el producto con el repositorio inyectado.
//                 await this.productsRepository.save(product);
//             }
//             console.log('Productos iniciales cargados exitosamente');
//         } else {
//             console.log('Los productos ya existen en la base de datos');
//         }
//     }


//     async addProduct(product: Partial<Product>): Promise<Product> {
//         const existingProduct = await this.productsRepository.findOne({
//           where: { name: product.name },
//         });

//         if (!existingProduct) {
//           const newProduct = this.productsRepository.create(product);
//           return await this.productsRepository.save(newProduct);
//         }
//         return existingProduct;
//     }

//     async getPaginatedProducts(page: number, limit: number): Promise <{ 
//         page: number; 
//         limit: number; 
//         totalProducts: number; 
//         totalPages: number; 
//         products: Product[]; 
//     }> {
//         const [products, totalProducts] = await this.productsRepository.findAndCount({
//             skip: (page - 1) * limit,
//             take: limit,
//         });
//         const totalPages = Math.ceil(totalProducts / limit);
//         return { page, limit, totalProducts, totalPages, products };
//     }
//     // const totalProducts = this.products.length;
//     // const totalPages = Math.ceil(totalProducts / limit);
//     // const startIndex = (page - 1) * limit;
//     // const endIndex = startIndex + limit;
//     // const paginatedProducts = this.products.slice(startIndex, endIndex);
//     // return {
//     //     page, limit, totalProducts, totalPages, products: paginatedProducts,
//     // };
//     // }
    
//     async getAllProducts(): Promise< Product[]> {
//         return this.productsRepository.find();
//     }

//     async getProductById(id: string): Promise< Product | null> {
//         return await this.productsRepository.findOne({where: {id} });
//     }

//     // async createProduct(product: Omit<ProductDto, 'id'>): Promise< ProductDto > {
//     //     const id = this.products.length + 1;
//     //     const newProduct: ProductDto = { id, ...product };
//     //     this.products.push(newProduct);
//     //     return newProduct;
//     // }

//     async updateProduct(id: string, updatedData: Partial<Product>): Promise <Product | null> {
//         const product = await this.productsRepository.findOne({where: {id} });

//         if ( !product ) return null;
//         Object.assign(product, updatedData);
//         return await this.productsRepository.save(product);
//     }

//     async deleteProduct(id: string): Promise<Product | null> {
//         const product = this.productsRepository.findOne({where: {id} });

//         if ( !product ) return null;

//         await this.productsRepository.delete(id);
//         return product;
//     }
// }