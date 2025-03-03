import { CategoriesService } from './categories.service';
import { Category } from './categories.entity';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    seedCategories(): Promise<string>;
    getAllCategories(): Promise<Category[]>;
    deleteCategory(id: string): Promise<{
        message: string;
    }>;
}
