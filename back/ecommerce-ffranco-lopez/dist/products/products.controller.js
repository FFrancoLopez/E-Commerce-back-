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
exports.ProductsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const auth_guard_1 = require("../guards/auth.guard");
const roles_decorator_1 = require("../decorators/roles.decorator");
const roles_enum_1 = require("../roles.enum");
const swagger_1 = require("@nestjs/swagger");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    async seedProducts() {
        return await this.productsService.addProducts();
    }
    async getProducts(page, limit) {
        try {
            if (page && limit) {
                const pageNumber = parseInt(page, 10) || 1;
                const limitNumber = parseInt(limit, 10) || 5;
                if (isNaN(pageNumber) || isNaN(limitNumber)) {
                    throw new common_1.BadRequestException("Los parametros de la paginación debern ser números válidos.");
                }
                return await this.productsService.getPaginatedProducts(pageNumber, limitNumber);
            }
            return await this.productsService.getProducts();
        }
        catch (error) {
            throw error;
        }
    }
    async getProductById(id) {
        const product = await this.productsService.getProductById(id);
        if (!product)
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado.`);
        return product;
    }
    async createProduct(product) {
        try {
            return await this.productsService.createProduct(product);
        }
        catch (error) {
            throw error;
        }
    }
    async updateProduct(id, product) {
        const updatedProduct = await this.productsService.updateProduct(id, product);
        if (!updatedProduct)
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado.`);
        return updatedProduct;
    }
    async deleteProduct(id) {
        const deletedProduct = await this.productsService.deleteProduct(id);
        if (!deletedProduct)
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado.`);
        return deletedProduct;
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.Get)('seeder'),
    openapi.ApiResponse({ status: 201, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "seedProducts", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./products.entity").Product }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./products.entity").Product }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.Role.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    openapi.ApiResponse({ status: 200, type: require("./products.entity").Product }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map