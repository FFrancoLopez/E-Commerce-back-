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
exports.Category = void 0;
const openapi = require("@nestjs/swagger");
const products_entity_1 = require("../products/products.entity");
const typeorm_1 = require("typeorm");
let Category = class Category {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String, description: "@description Nombre de la categor\u00EDa con un m\u00E1ximo de 50 caracteres.", example: "smartphone" }, products: { required: true, type: () => [require("../products/products.entity").Product] } };
    }
};
exports.Category = Category;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false, unique: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => products_entity_1.Product, (product) => product.category),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Category.prototype, "products", void 0);
exports.Category = Category = __decorate([
    (0, typeorm_1.Entity)({ name: 'CATEGORIES' })
], Category);
//# sourceMappingURL=categories.entity.js.map