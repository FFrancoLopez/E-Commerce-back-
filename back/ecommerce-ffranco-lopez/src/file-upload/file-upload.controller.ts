import { UseGuards, Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
  
  @ApiBearerAuth()
  @Post('uploadImage/:productId')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('productId', ParseUUIDPipe) productId: string, 
    @UploadedFile(
      new ParseFilePipe({ 
        validators: [ 
          new MaxFileSizeValidator({ 
            maxSize: 200000, 
            message: 'El tamaño máximo de un archivo es de 200 KB', 
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          })
        ],  
      })
        
    ) file: Express.Multer.File
    
    
  ){
    return this.fileUploadService.uploadImage(file, productId);
  } 
    
  
}
