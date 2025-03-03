import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { FileUploadModule } from './file-upload/file-upload.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory:( configService: ConfigService ) => configService.get('typeorm'),
    }), 
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    FileUploadModule,
    UsersModule, 
    AuthModule, 
    OrdersModule,
    ProductsModule, 
    CategoriesModule
  ],  
  controllers: [],
  providers: [],
})
export class AppModule {}
