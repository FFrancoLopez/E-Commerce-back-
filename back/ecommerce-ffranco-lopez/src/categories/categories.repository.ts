// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Category } from './categories.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class CategoriesRepository {
//     constructor(
//         @InjectRepository(Category)
//         private readonly categoriesRepository: Repository<Category>,
//     ) {}


//     async getCategories(): Promise<Category[]> {
//         return await this.categoriesRepository.find({relations: ['products']});;
//     }

//     async addCategories( categories: string[] ):Promise<Category[]> {
//         const existingCategories = await this.categoriesRepository.find({
//             where: categories.map( (name) => ({name})),
//         })
//         const newCategories = categories
//         .filter( (name) => !existingCategories.some( (c) => c.name === name))
        
//         // Creamos las categorías nuevas
//         const createdCategories = this.categoriesRepository.create(newCategories.map( (name) => ({name})),
//         );

//         // Guardamos las categorías nuevas
//         return await this.categoriesRepository.save(createdCategories);
//     }

//     async deleteCategory(id: string): Promise<void> {
//         const category = await this.categoriesRepository.findOne({where: {id} });
//         if(!category){
//             throw new NotFoundException(`La categoría con id ${id} no existe`);
//         }
//         await this.categoriesRepository.delete(id);
//     }

//     async getCategoryByName(name: string): Promise<Category | null> {
//         return await this.categoriesRepository.findOne({where: {name}});
//     }
// }