import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { OrdersController } from "./orders.controller";
import { OrderDetails } from "./ordersDetails.entity";
import { OrdersService } from "./orders.service";
import { UsersModule } from "src/users/users.module";
import { ProductsModule } from "src/products/products.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderDetails]),
        UsersModule,
        ProductsModule
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService]
})

export class OrdersModule {}