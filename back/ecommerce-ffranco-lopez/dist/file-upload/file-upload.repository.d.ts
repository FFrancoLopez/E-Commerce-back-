import { UploadApiResponse } from 'cloudinary';
export declare class FileUploadRepository {
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>;
}
