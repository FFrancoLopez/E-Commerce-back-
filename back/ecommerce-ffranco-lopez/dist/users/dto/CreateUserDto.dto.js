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
exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const matchPassword_1 = require("../../utils/matchPassword");
class CreateUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, description: "@description Nombre del usuario con al min. 3 caracteres y m\u00E1ximo 80.", example: "Juan", minLength: 3, maxLength: 80 }, age: { required: true, type: () => Number, description: "@description La edad del usuario debe ser al menos de dos digitos.", example: 20 }, email: { required: true, type: () => String, description: "@description Debe ser un email v\u00E1lido.", example: "juan@gmail.com", format: "email" }, password: { required: true, type: () => String, description: "@description La contrase\u00F1a debe contener al menos una letra may\u00FAscula, una letra min\u00FAscula, un n\u00FAmero, un car\u00E1cter especial y entre 8 y 15 caracteres.", example: "Ab123456!", pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,15}$/" }, confirmPassword: { required: true, type: () => String, description: "@description Confirmaci\u00F3n de la contrase\u00F1a.", example: "Ab123456!" }, address: { required: true, type: () => String, description: "@description Direcci\u00F3n del usuario con al min. 3 caracteres y m\u00E1ximo 80.", example: "Calle-123", minLength: 3, maxLength: 80 }, phone: { required: true, type: () => Number, description: "@description Numero telefonico v\u00E1lido del usuario.", example: 1223456789 }, country: { required: true, type: () => String, description: "@description Pa\u00EDs del usuario con min. 5 caracteres y m\u00E1ximo 20.", example: "Argentina", minLength: 5, maxLength: 20 }, city: { required: true, type: () => String, description: "@description Cuidad del usuario con min. 5 caracteres y m\u00E1ximo 20.", example: "C\u00F3rdoba", minLength: 5, maxLength: 20 } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 80),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
        message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(matchPassword_1.MatchPassword, ['password']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 80),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 20),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 20),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
//# sourceMappingURL=CreateUserDto.dto.js.map