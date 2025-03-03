import { FileUploadService } from './file-upload.service';
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadImage(productId: string, file: Express.Multer.File): Promise<import("../products/products.entity").Product>;
}
