"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const orders_entity_1 = require("./orders.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ordersDetails_entity_1 = require("./ordersDetails.entity");
const products_entity_1 = require("../products/products.entity");
const users_service_1 = require("../users/users.service");
let OrdersService = class OrdersService {
    constructor(ordersRepository, orderDetailRepository, usersService, productRepository) {
        this.ordersRepository = ordersRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.usersService = usersService;
        this.productRepository = productRepository;
    }
    async addOrder(userId, products) {
        const user = await this.usersService.getUserById(userId);
        if (!user) {
            throw new common_1.NotFoundException('El usuario no existe.');
        }
        const order = this.ordersRepository.create({ user, date: new Date() });
        await this.ordersRepository.save(order);
        const orderDetails = await Promise.all(products.map(async (productData) => {
            const product = await this.productRepository.findOne({
                where: { id: productData.id, stock: (0, typeorm_2.MoreThan)(0) },
            });
            if (!product) {
                throw new common_1.NotFoundException('El producto no existe.');
            }
            ;
            const orderDetail = this.orderDetailRepository.create({
                order,
                price: product.price,
                products: [product],
            });
            product.stock -= 1;
            await this.productRepository.save(product);
            await this.orderDetailRepository.save(orderDetail);
            return orderDetail;
        }));
        const total = orderDetails
            .filter((detail) => detail)
            .reduce((sum, detail) => sum + detail.price, 0);
        return await this.ordersRepository.save(order);
    }
    async getOrder(id) {
        const order = await this.ordersRepository.findOne({
            where: { id },
            relations: ['orderDetails', 'orderDetails.products', 'user'],
        });
        if (!order) {
            throw new common_1.NotFoundException('La orden no existe.');
        }
        const orderDetails = {
            price: order.orderDetails.price,
            products: (order.orderDetails.products || []).map((product) => ({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
            })),
        };
        return {
            id: order.id,
            date: order.date,
            user: {
                id: order.user.id,
                name: order.user.name,
            },
            orderDetails,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(orders_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(ordersDetails_entity_1.OrderDetails)),
    __param(3, (0, typeorm_1.InjectRepository)(products_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map