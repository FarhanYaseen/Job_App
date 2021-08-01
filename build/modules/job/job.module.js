"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var job_controller_1 = require("./job.controller");
var job_service_1 = require("./job.service");
var shift_module_1 = require("../shift/shift.module");
var typeorm_1 = require("@nestjs/typeorm");
var job_entity_1 = require("./job.entity");
var JobModule = /** @class */ (function () {
    function JobModule() {
    }
    JobModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([job_entity_1.Job]), shift_module_1.ShiftModule],
            controllers: [job_controller_1.JobController],
            providers: [job_service_1.JobService],
            exports: [job_service_1.JobService],
        })
    ], JobModule);
    return JobModule;
}());
exports.JobModule = JobModule;
//# sourceMappingURL=job.module.js.map