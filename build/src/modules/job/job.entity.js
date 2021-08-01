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
var typeorm_1 = require("typeorm");
var shift_entity_1 = require("../shift/shift.entity");
var Job = /** @class */ (function () {
    function Job() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Job.prototype, "id", void 0);
    __decorate([
        typeorm_1.VersionColumn(),
        __metadata("design:type", Number)
    ], Job.prototype, "version", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Job.prototype, "companyId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Job.prototype, "startTime", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Job.prototype, "endTime", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return shift_entity_1.Shift; }, function (shift) { return shift.job; }, {
            cascade: true,
        }),
        __metadata("design:type", Array)
    ], Job.prototype, "shifts", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Job.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Job.prototype, "updatedAt", void 0);
    Job = __decorate([
        typeorm_1.Entity({ name: 'job_process' })
    ], Job);
    return Job;
}());
exports.Job = Job;
//# sourceMappingURL=job.entity.js.map