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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetails = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const orders_entity_1 = require("./orders.entity");
const products_entity_1 = require("../products/products.entity");
let OrderDetails = class OrderDetails {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, price: { required: true, type: () => Number, description: "@description Precio del producto con un min de 2 decimales.", example: 299.99 }, products: { required: true, type: () => [require("../products/products.entity").Product] }, order: { required: true, type: () => require("./orders.entity").Order } };
    }
};
exports.OrderDetails = OrderDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderDetails.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], OrderDetails.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => products_entity_1.Product, (product) => product.orderDetails),
    (0, typeorm_1.JoinTable)({ name: 'ORDER_DETAILS_PRODUCTS' }),
    __metadata("design:type", Array)
], OrderDetails.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => orders_entity_1.Order, (order) => order.orderDetails),
    (0, typeorm_1.JoinColumn)({ name: 'order_id' }),
    __metadata("design:type", orders_entity_1.Order)
], OrderDetails.prototype, "order", void 0);
exports.OrderDetails = OrderDetails = __decorate([
    (0, typeorm_1.Entity)({ name: 'ORDER_DETAILS' })
], OrderDetails);
//# sourceMappingURL=ordersDetails.entity.js.map