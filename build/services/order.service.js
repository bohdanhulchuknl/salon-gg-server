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
exports.storeOrderInDB = exports.checkIsPropsExistInDB = exports.checkProvideBodyCreateOrder = void 0;
var User_model_1 = __importDefault(require("../models/User.model"));
var Editor_model_1 = __importDefault(require("../models/Editor.model"));
var Service_model_1 = __importDefault(require("../models/Service.model"));
var Order_model_1 = __importDefault(require("../models/Order.model"));
var constants_1 = require("../config/constants");
var checkProvideBodyCreateOrder = function (req) {
    var _a = req.body, fromUser = _a.fromUser, toEditor = _a.toEditor, services = _a.services, totalPrice = _a.totalPrice, totalTime = _a.totalTime, start = _a.start, end = _a.end;
    if (!fromUser.trim())
        throw new Error("fromUser don`t provide");
    if (!toEditor.trim())
        throw new Error("toEditor don`t provide");
    if (!services.length)
        throw new Error("Services can`t be empty");
    if (!totalPrice) {
        throw new Error("totalPrice don`t provide");
    }
    else {
        if (totalPrice <= 0)
            throw new Error("totalPrice must be > 0");
    }
    if (!totalTime) {
        throw new Error("totalTime don`t provide");
    }
    else {
        if (totalTime <= 0)
            throw new Error("totalTime must be > 0");
    }
    if (!start || !start.length)
        throw new Error("Order start don`t provide");
    if (!end || !end.length)
        throw new Error("Order end don`t provide");
};
exports.checkProvideBodyCreateOrder = checkProvideBodyCreateOrder;
var checkIsPropsExistInDB = function (fromUser, toEditor, services) { return __awaiter(void 0, void 0, void 0, function () {
    var user, editor, err_1, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, User_model_1.default.findById(fromUser)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new Error("User with id ".concat(fromUser, " don't exist"));
                return [4 /*yield*/, Editor_model_1.default.findById(toEditor)];
            case 2:
                editor = _a.sent();
                if (!editor)
                    throw new Error("Editor with id ".concat(toEditor, " don't exist"));
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4 /*yield*/, Service_model_1.default.find({ _id: { $in: services } })];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                throw new Error("Service with id ".concat(err_1.value, " don't exist"));
            case 6: return [3 /*break*/, 8];
            case 7:
                err_2 = _a.sent();
                throw new Error(err_2.message);
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.checkIsPropsExistInDB = checkIsPropsExistInDB;
var storeOrderInDB = function (fromUser, toEditor, services, totalPrice, totalTime, start, end) { return __awaiter(void 0, void 0, void 0, function () {
    var newOrder, user, editor, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                newOrder = new Order_model_1.default({
                    fromUser: fromUser,
                    toEditor: toEditor,
                    services: services,
                    totalPrice: totalPrice,
                    totalTime: totalTime,
                    start: start,
                    end: end,
                    status: {
                        title: constants_1.ORDER_STATUSES.pending.title,
                        text: constants_1.ORDER_STATUSES.pending.text.admin,
                    },
                });
                return [4 /*yield*/, newOrder.save()];
            case 1:
                _a.sent();
                return [4 /*yield*/, User_model_1.default.findById(fromUser)];
            case 2:
                user = _a.sent();
                user === null || user === void 0 ? void 0 : user.orders.push(newOrder._id);
                return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.save())];
            case 3:
                _a.sent();
                return [4 /*yield*/, Editor_model_1.default.findById(toEditor)];
            case 4:
                editor = _a.sent();
                editor === null || editor === void 0 ? void 0 : editor.orders.push(newOrder._id);
                return [4 /*yield*/, (editor === null || editor === void 0 ? void 0 : editor.save())];
            case 5:
                _a.sent();
                return [2 /*return*/, newOrder];
            case 6:
                err_3 = _a.sent();
                throw new Error(err_3.message);
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.storeOrderInDB = storeOrderInDB;
