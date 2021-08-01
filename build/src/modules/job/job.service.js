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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var uuid_1 = require("uuid");
var date_fns_1 = require("date-fns");
var typeorm_2 = require("typeorm");
var job_entity_1 = require("./job.entity");
var shift_entity_1 = require("../shift/shift.entity");
var JobService = /** @class */ (function () {
    function JobService(jobRepository) {
        this.jobRepository = jobRepository;
    }
    JobService.prototype.createJob = function (uuid, date1, date2) {
        return __awaiter(this, void 0, void 0, function () {
            var job;
            return __generator(this, function (_a) {
                date1.setUTCHours(8);
                date2.setUTCHours(17);
                job = new job_entity_1.Job();
                job.id = uuid;
                job.companyId = uuid_1.v4();
                job.startTime = date1;
                job.endTime = date2;
                job.shifts = date_fns_1.eachDayOfInterval({ start: date1, end: date2 }).map(function (day) {
                    var startTime = new Date(day);
                    startTime.setUTCHours(8);
                    var endTime = new Date(day);
                    endTime.setUTCHours(17);
                    var shift = new shift_entity_1.Shift();
                    shift.id = uuid_1.v4();
                    shift.job = job;
                    shift.startTime = startTime;
                    shift.endTime = endTime;
                    return shift;
                });
                return [2 /*return*/, this.jobRepository.save(job)];
            });
        });
    };
    JobService.prototype.getJobs = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.jobRepository.find()];
            });
        });
    };
    JobService.prototype.cancelJob = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var job;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.jobRepository.findOne(id)];
                    case 1:
                        job = _a.sent();
                        if (job) {
                            try {
                                return [2 /*return*/, this.jobRepository.delete({ id: id })];
                            }
                            catch (e) {
                                throw new common_1.HttpException("Could not cancel the job with id:" + id, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                            }
                        }
                        else {
                            throw new common_1.HttpException("Could not find the job with id:" + id, common_1.HttpStatus.NOT_FOUND);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    JobService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(job_entity_1.Job)),
        __metadata("design:paramtypes", [typeorm_2.Repository])
    ], JobService);
    return JobService;
}());
exports.JobService = JobService;
//# sourceMappingURL=job.service.js.map