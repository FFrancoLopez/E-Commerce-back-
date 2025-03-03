import { Product } from "./products.entity";
import { Repository } from "typeorm";
import { Category } from "src/categories/categories.entity";
export declare class ProductsService {
    private readonly productsRepository;
    private readonly categoriesService;
    constructor(productsRepository: Repository<Product>, categoriesService: Repository<Category>);
    addProducts(): Promise<string>;
    getPaginatedProducts(page: number, limit: number): Promise<{
        page: number;
        limit: number;
        totalProducts: number;
        totalPages: number;
        products: Product[];
    }>;
    getProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    createProduct(product: Partial<Product>): Promise<Product>;
    updateProduct(id: string, updatedData: Partial<Product>): Promise<Partial<Product> | null>;
    deleteProduct(id: string): Promise<Product | null>;
}
