import { UseGuards, Controller, Post, Body, Get, Param, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { CreateOrderDto } from './dto/CreateOrderDto.dto';
import { OrdersService } from './orders.service';
import { AuthGuard } from "../guards/auth.guard";
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @HttpCode(201)
  @Post()
  @UseGuards(AuthGuard)
  async addOrder(@Body() createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    return await this.ordersService.addOrder(userId, products);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard)
  async getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return await this.ordersService.getOrder(id);
  }
}
