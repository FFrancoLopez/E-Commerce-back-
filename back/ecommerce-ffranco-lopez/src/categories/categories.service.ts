import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './categories.entity';
import * as data from '../data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async seedCategories(): Promise<string> {
    try {
      // Obtenemos las categorías existentes en la base de datos.
      const existingCategories = await this.categoriesRepository.find();
      const existingCategoriesNames = new Set(existingCategories.map((c) => c.name)); // Usamos Set para buscar más rápido.
  
      // Iteramos sobre los datos de productos y agregamos categorías faltantes
      for (const product of data) {

        if (!existingCategoriesNames.has(product.category)) {

          const newCategory = this.categoriesRepository.create({ name: product.category });

          await this.categoriesRepository.save(newCategory);
          existingCategoriesNames.add(product.category); // Actualizamos el conjunto local para evitar duplicados
        }
      }
  
      return 'Categorías creadas exitosamente';
    } catch (error) {
      
      throw new NotFoundException('Error al crear las categorías');
    }
  }
  


  async getAllCategories(): Promise<Category[]> {
    return await this.categoriesRepository.find({relations: ['products']});;
  }


  async deleteCategory(id: string): Promise<string> {
    const category = await this.categoriesRepository.findOne({where: {id} });
    if(!category){
      throw new NotFoundException(`La categoría con id ${id} no existe`);
    }
    // Verificamos si la categoría tiene productos relacionados
    const relatedProducts = await this.categoriesRepository.createQueryBuilder('category').leftJoinAndSelect('category.products', 'product').where('category.id = :id', { id }).getOne();

    if (relatedProducts?.products?.length){
      throw new ConflictException(`No se puede eliminar la categoría ${category.name} porque tiene productos asociados.`);
    }

    await this.categoriesRepository.delete(id);
    return `Categoría con ID ${id} eliminada exitosamente`;
  }

}
