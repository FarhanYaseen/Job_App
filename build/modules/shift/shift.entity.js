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
var job_entity_1 = require("../job/job.entity");
var Shift = /** @class */ (function () {
    function Shift() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Shift.prototype, "id", void 0);
    __decorate([
        typeorm_1.VersionColumn(),
        __metadata("design:type", Number)
    ], Shift.prototype, "version", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return job_entity_1.Job; }, function (job) { return job.shifts; }),
        __metadata("design:type", job_entity_1.Job)
    ], Shift.prototype, "job", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Shift.prototype, "jobId", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Shift.prototype, "talentId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Shift.prototype, "startTime", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Shift.prototype, "endTime", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Shift.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Shift.prototype, "updatedAt", void 0);
    Shift = __decorate([
        typeorm_1.Entity()
    ], Shift);
    return Shift;
}());
exports.Shift = Shift;
//# sourceMappingURL=shift.entity.js.map