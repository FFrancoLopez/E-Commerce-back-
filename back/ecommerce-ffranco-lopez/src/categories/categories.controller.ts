import { Controller, Get, Param, Delete, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}


  // Seeder para cargar las categorías.
  @HttpCode(201)
  @Get('seeder')
  async seedCategories(): Promise<string> {
    return await this.categoriesService.seedCategories();
  }

  // Devuelve todas las categorías.
  @HttpCode(200)
  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoriesService.getAllCategories();
  }

  // Elimina una categoría.
  @HttpCode(200)
  @Delete(':id')
  async deleteCategory(@Param('id', ParseUUIDPipe) id: string): Promise<{message: string}> {
    const result = await this.categoriesService.deleteCategory(id);
    return { message: result };
  }

}