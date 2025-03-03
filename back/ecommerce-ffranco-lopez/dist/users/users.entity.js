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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const orders_entity_1 = require("../orders/orders.entity");
const typeorm_1 = require("typeorm");
let User = class User {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String, description: "@description Nombre del usuario con al min. 3 caracteres y m\u00E1ximo 80.", example: "Juan" }, age: { required: true, type: () => Number, description: "@description La edad del usuario debe ser de al menos 2 digitos.", example: 20 }, email: { required: true, type: () => String, description: "@description Debe ser un email v\u00E1lido.", example: "juan@gmail.com" }, password: { required: true, type: () => String, description: "@description La contrase\u00F1a debe contener al menos una letra may\u00FAscula, una letra min\u00FAscula, un n\u00FAmero, un car\u00E1cter especial y entre 8 y 15 caracteres.", example: "Ab123456!" }, phone: { required: true, type: () => Number, description: "@description Numero telefonico v\u00E1lido del usuario.", example: 1223456789 }, country: { required: true, type: () => String, description: "@description Pa\u00EDs del usuario con min. 5 caracteres y m\u00E1ximo 20.", example: "Argentina" }, address: { required: true, type: () => String, description: "@description Direcci\u00F3n del usuario con al min. 3 caracteres y m\u00E1ximo 80.", example: "Calle-123" }, city: { required: true, type: () => String, description: "@description Cuidad del usuario con min. 5 caracteres y m\u00E1ximo 20.", example: "C\u00F3rdoba" }, isAdmin: { required: true, type: () => Boolean, description: "@description Si el usuario es administrador, es true, caso contrario es false (por defecto).", example: false }, orders: { required: true, type: () => [require("../orders/orders.entity").Order] } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: false }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, unique: true, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orders_entity_1.Order, (order) => order.user),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'USERS' })
], User);
//# sourceMappingURL=users.entity.js.map