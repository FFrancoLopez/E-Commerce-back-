import { ProductsService } from './products.service';
import { Product } from './products.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    seedProducts(): Promise<string>;
    getProducts(page?: string, limit?: string): Promise<Product[] | {
        page: number;
        limit: number;
        totalProducts: number;
        totalPages: number;
        products: Product[];
    }>;
    getProductById(id: string): Promise<Product>;
    createProduct(product: Partial<Product>): Promise<Product>;
    updateProduct(id: string, product: Partial<Product>): Promise<Partial<Product> | null>;
    deleteProduct(id: string): Promise<Product>;
}
