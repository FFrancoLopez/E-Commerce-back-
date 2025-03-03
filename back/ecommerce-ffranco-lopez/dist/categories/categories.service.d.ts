import { Category } from './categories.entity';
import { Repository } from 'typeorm';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    seedCategories(): Promise<string>;
    getAllCategories(): Promise<Category[]>;
    deleteCategory(id: string): Promise<string>;
}
