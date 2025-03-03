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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const categories_entity_1 = require("./categories.entity");
const data = require("../data.json");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let CategoriesService = class CategoriesService {
    constructor(categoriesRepository) {
        this.categoriesRepository = categoriesRepository;
    }
    async seedCategories() {
        try {
            const existingCategories = await this.categoriesRepository.find();
            const existingCategoriesNames = new Set(existingCategories.map((c) => c.name));
            for (const product of data) {
                if (!existingCategoriesNames.has(product.category)) {
                    const newCategory = this.categoriesRepository.create({ name: product.category });
                    await this.categoriesRepository.save(newCategory);
                    existingCategoriesNames.add(product.category);
                }
            }
            return 'Categorías creadas exitosamente';
        }
        catch (error) {
            throw new common_1.NotFoundException('Error al crear las categorías');
        }
    }
    async getAllCategories() {
        return await this.categoriesRepository.find({ relations: ['products'] });
        ;
    }
    async deleteCategory(id) {
        const category = await this.categoriesRepository.findOne({ where: { id } });
        if (!category) {
            throw new common_1.NotFoundException(`La categoría con id ${id} no existe`);
        }
        const relatedProducts = await this.categoriesRepository.createQueryBuilder('category').leftJoinAndSelect('category.products', 'product').where('category.id = :id', { id }).getOne();
        if (relatedProducts?.products?.length) {
            throw new common_1.ConflictException(`No se puede eliminar la categoría ${category.name} porque tiene productos asociados.`);
        }
        await this.categoriesRepository.delete(id);
        return `Categoría con ID ${id} eliminada exitosamente`;
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(categories_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map