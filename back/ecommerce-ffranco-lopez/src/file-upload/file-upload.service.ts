import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor(
        private fileUploadRepository: FileUploadRepository,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) {}

    async uploadImage(file: Express.Multer.File, productId: string) {
        const product = await this.productRepository.findOneBy({id: productId});

        if (!product) {
            throw new NotFoundException("Producto no encontrado");
        }

        const uploadImage = await this.fileUploadRepository.uploadImage(file);
        
        await this.productRepository.update(product.id, {
            imgUrl: 
            uploadImage.secure_url,
        });

        return await this.productRepository.findOneBy({id: productId});
    
    }
    
}
