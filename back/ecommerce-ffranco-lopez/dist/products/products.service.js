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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_entity_1 = require("./products.entity");
const data = require("../data.json");
const typeorm_1 = require("typeorm");
const categories_entity_1 = require("../categories/categories.entity");
const typeorm_2 = require("@nestjs/typeorm");
let ProductsService = class ProductsService {
    constructor(productsRepository, categoriesService) {
        this.productsRepository = productsRepository;
        this.categoriesService = categoriesService;
    }
    async addProducts() {
        const categories = await this.categoriesService.find();
        for (const element of data) {
            const category = categories.find((c) => c.name === element.category);
            if (!category) {
                throw new common_1.BadRequestException(`La categoría ${element.category} no existe.`);
            }
            const product = new products_entity_1.Product();
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.stock = element.stock;
            product.category = category;
            await this.productsRepository.createQueryBuilder().insert().into(products_entity_1.Product).values(product).orUpdate(['description', 'price', 'stock'], ['name']).execute();
        }
        ;
        return 'Productos creados exitosamente.';
    }
    async getPaginatedProducts(page, limit) {
        const [products, totalProducts] = await this.productsRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        const totalPages = Math.ceil(totalProducts / limit);
        return { page, limit, totalProducts, totalPages, products };
    }
    async getProducts() {
        return await this.productsRepository.find();
    }
    async getProductById(id) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado.`);
        return product;
    }
    async createProduct(product) {
        const existingProduct = await this.productsRepository.findOne({
            where: { name: product.name },
        });
        if (existingProduct)
            throw new common_1.BadRequestException(`El producto ${product.name} ya existe.`);
        const newProduct = this.productsRepository.create(product);
        return await this.productsRepository.save(newProduct);
    }
    async updateProduct(id, updatedData) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado.`);
        Object.assign(product, updatedData);
        return await this.productsRepository.save(product);
    }
    async deleteProduct(id) {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product)
            throw new common_1.NotFoundException(`Producto con ID ${id} no encontrado.`);
        await this.productsRepository.delete(id);
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(products_entity_1.Product)),
    __param(1, (0, typeorm_2.InjectRepository)(categories_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map