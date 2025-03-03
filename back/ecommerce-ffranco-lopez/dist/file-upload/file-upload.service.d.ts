import { FileUploadRepository } from './file-upload.repository';
import { Product } from 'src/products/products.entity';
import { Repository } from 'typeorm';
export declare class FileUploadService {
    private fileUploadRepository;
    private productRepository;
    constructor(fileUploadRepository: FileUploadRepository, productRepository: Repository<Product>);
    uploadImage(file: Express.Multer.File, productId: string): Promise<Product>;
}
