"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeNewServiceGroupInDB = exports.checkIsGroupExist = exports.checkIsProvideBodyCreateServiceGroup = exports.storeNewServiceInDb = exports.checkIsServiceExist = exports.checkIsProvideBodyCreateService = void 0;
var ServiceGroup_model_1 = __importDefault(require("../models/ServiceGroup.model"));
var Service_model_1 = __importDefault(require("../models/Service.model"));
//service
var checkIsProvideBodyCreateService = function (req) {
    var _a = req.body, title = _a.title, price = _a.price, time = _a.time, serviceGroup = _a.serviceGroup, editors = _a.editors;
    if (!title || typeof title !== "object") {
        throw new Error("Title must be provide or title type isn`t object");
    }
    else {
        if (!title.ua || title.ua.length === 0)
            throw new Error("Title UA must be provide");
        if (!title.pl || title.pl.length === 0)
            throw new Error("Title PL must be provide");
    }
    if (!price || typeof price !== "object") {
        throw new Error("Price must be provide");
    }
    else {
        if (!price.junior)
            throw new Error("Price.junior must be provide");
        if (!price.middle)
            throw new Error("Price.middle must be provide");
        if (!price.senior)
            throw new Error("Price.senior must be provide");
    }
    if (!time)
        throw new Error("Time must be provide");
    if (!serviceGroup)
        throw new Error("Service group must be provide");
};
exports.checkIsProvideBodyCreateService = checkIsProvideBodyCreateService;
var checkIsServiceExist = function (_a) {
    var title = _a.title;
    return __awaiter(void 0, void 0, void 0, function () {
        var serviceInDB;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Service_model_1.default.find().or([
                        { "title.ua": title.ua.trim() },
                        { "title.pl": title.pl.trim() },
                    ])];
                case 1:
                    serviceInDB = _b.sent();
                    if (serviceInDB.length)
                        throw new Error("Service with title ".concat(title.ua, " or ").concat(title.pl, " already exist"));
                    return [2 /*return*/];
            }
        });
    });
};
exports.checkIsServiceExist = checkIsServiceExist;
var storeNewServiceInDb = function (_a) {
    var price = _a.price, serviceGroup = _a.serviceGroup, time = _a.time, title = _a.title, editors = _a.editors;
    return __awaiter(void 0, void 0, void 0, function () {
        var serviceGroupInDB, newService;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, ServiceGroup_model_1.default.findById(serviceGroup)];
                case 1:
                    serviceGroupInDB = _b.sent();
                    if (!serviceGroupInDB)
                        throw new Error("Service group with id ".concat(serviceGroup, " don't found"));
                    newService = new Service_model_1.default({ price: price, serviceGroup: serviceGroup, time: time, title: title, editors: editors });
                    return [4 /*yield*/, newService.save()];
                case 2:
                    _b.sent();
                    serviceGroupInDB.variants.push(newService._id);
                    return [4 /*yield*/, serviceGroupInDB.save()];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, newService.populate("serviceGroup")];
                case 4: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
exports.storeNewServiceInDb = storeNewServiceInDb;
//service group
var checkIsProvideBodyCreateServiceGroup = function (req) {
    var title = req.body.title;
    if (!title || typeof title !== "object") {
        throw new Error("Title must be provide or type of title isn`t object");
    }
    else {
        if (!title.ua || !title.ua.length)
            throw new Error("Title UA must be provide");
        if (!title.pl || !title.pl.length)
            throw new Error("Title PL must be provide");
    }
};
exports.checkIsProvideBodyCreateServiceGroup = checkIsProvideBodyCreateServiceGroup;
var checkIsGroupExist = function (title) { return __awaiter(void 0, void 0, void 0, function () {
    var group;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ServiceGroup_model_1.default.find().or([
                    { "title.ua": title.ua.trim() },
                    { "title.pl": title.pl.trim() },
                ])];
            case 1:
                group = _a.sent();
                if (group.length)
                    throw new Error("Service group with title ".concat(title.pl, " or ").concat(title.ua, " already exist"));
                return [2 /*return*/];
        }
    });
}); };
exports.checkIsGroupExist = checkIsGroupExist;
var storeNewServiceGroupInDB = function (title, variants) { return __awaiter(void 0, void 0, void 0, function () {
    var newServiceGroup;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newServiceGroup = new ServiceGroup_model_1.default({ title: title, variants: variants });
                return [4 /*yield*/, newServiceGroup.save()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.storeNewServiceGroupInDB = storeNewServiceGroupInDB;
