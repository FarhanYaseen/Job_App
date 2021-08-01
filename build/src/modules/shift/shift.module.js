"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var shift_controller_1 = require("./shift.controller");
var typeorm_1 = require("@nestjs/typeorm");
var shift_entity_1 = require("./shift.entity");
var shift_service_1 = require("./shift.service");
var ShiftModule = /** @class */ (function () {
    function ShiftModule() {
    }
    ShiftModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([shift_entity_1.Shift])],
            controllers: [shift_controller_1.ShiftController],
            providers: [shift_service_1.ShiftService],
            exports: [shift_service_1.ShiftService],
        })
    ], ShiftModule);
    return ShiftModule;
}());
exports.ShiftModule = ShiftModule;
//# sourceMappingURL=shift.module.js.map