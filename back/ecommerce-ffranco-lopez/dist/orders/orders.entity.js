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
exports.Order = void 0;
const openapi = require("@nestjs/swagger");
const users_entity_1 = require("../users/users.entity");
const typeorm_1 = require("typeorm");
const ordersDetails_entity_1 = require("./ordersDetails.entity");
let Order = class Order {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String, description: "@description ID de la orden.", example: "d2718621-b174-44b4-a8ed-b1d277c14301" }, date: { required: true, type: () => Date }, orderDetails: { required: true, type: () => require("./ordersDetails.entity").OrderDetails }, user: { required: true, type: () => Object } };
    }
};
exports.Order = Order;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Order.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => ordersDetails_entity_1.OrderDetails, (orderDetails) => orderDetails.order),
    __metadata("design:type", ordersDetails_entity_1.OrderDetails)
], Order.prototype, "orderDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.User, (user) => user.orders),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", Object)
], Order.prototype, "user", void 0);
exports.Order = Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'ORDERS' })
], Order);
//# sourceMappingURL=orders.entity.js.map