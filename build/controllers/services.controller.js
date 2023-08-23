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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceGroup = exports.createService = void 0;
var service_service_1 = require("../services/service.service");
var createService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, price, time, serviceGroup, editors, newService, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                (0, service_service_1.checkIsProvideBodyCreateService)(req);
                _a = req.body, title = _a.title, price = _a.price, time = _a.time, serviceGroup = _a.serviceGroup, editors = _a.editors;
                return [4 /*yield*/, (0, service_service_1.checkIsServiceExist)({ title: title })];
            case 1:
                _b.sent();
                return [4 /*yield*/, (0, service_service_1.storeNewServiceInDb)({
                        price: price,
                        serviceGroup: serviceGroup,
                        time: time,
                        title: title,
                        editors: editors
                    })];
            case 2:
                newService = _b.sent();
                return [2 /*return*/, res.status(200).json(newService)];
            case 3:
                err_1 = _b.sent();
                return [2 /*return*/, res.status(500).json(err_1.message)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createService = createService;
var createServiceGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, variants, newServiceGroup, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                (0, service_service_1.checkIsProvideBodyCreateServiceGroup)(req);
                _a = req.body, title = _a.title, variants = _a.variants;
                return [4 /*yield*/, (0, service_service_1.checkIsGroupExist)(title)];
            case 1:
                _b.sent();
                return [4 /*yield*/, (0, service_service_1.storeNewServiceGroupInDB)(title, variants)];
            case 2:
                newServiceGroup = _b.sent();
                return [2 /*return*/, res.status(200).json(newServiceGroup)];
            case 3:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(500).json(err_2.message)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createServiceGroup = createServiceGroup;
