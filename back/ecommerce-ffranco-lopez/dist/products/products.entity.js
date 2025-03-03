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
exports.Product = void 0;
const openapi = require("@nestjs/swagger");
const categories_entity_1 = require("../categories/categories.entity");
const ordersDetails_entity_1 = require("../orders/ordersDetails.entity");
const typeorm_1 = require("typeorm");
let Product = class Product {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String, description: "@description Nombre del producto con un maximo de 50 caracteres.", example: "Samsung Odyssey G9" }, description: { required: true, type: () => String, description: "@description Descripci\u00F3n del producto con un maximo de 255 caracteres.", example: "The best monitor in the world." }, price: { required: true, type: () => Number, description: "@description Precio del producto con un min de 2 decimales.", example: 299.99 }, stock: { required: true, type: () => Number, description: "@description Cantidad de productos que se pueden comprar.", example: 12 }, imgUrl: { required: true, type: () => String, description: "@description URL de la imagen del producto.", example: "https://example.com/image.jpg" }, category: { required: true, type: () => require("../categories/categories.entity").Category }, orderDetails: { required: true, type: () => [require("../orders/ordersDetails.entity").OrderDetails] } };
    }
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'https://example.com/image.jpg' }),
    __metadata("design:type", String)
], Product.prototype, "imgUrl", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_entity_1.Category, (category) => category.products),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", categories_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => ordersDetails_entity_1.OrderDetails, (orderDetails) => orderDetails.products),
    __metadata("design:type", Array)
], Product.prototype, "orderDetails", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)({ name: 'PRODUCTS' })
], Product);
//# sourceMappingURL=products.entity.js.map