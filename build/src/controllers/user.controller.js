"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.userLogin = exports.getUserByEmail = exports.getUserById = exports.getAllUsers = exports.createUserAccount = void 0;
var http_exception_1 = require("../common/http-exception");
var user_service_1 = require("../services/user.service");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var createUserAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var request, _a, _b, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                request = req.body;
                console.log(JSON.stringify(request));
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, (0, user_service_1.findUserByEmail)(request.email)];
            case 2:
                if (!!(_c.sent())) return [3 /*break*/, 4];
                _b = (_a = res).send;
                return [4 /*yield*/, (0, user_service_1.createUser)(request)];
            case 3: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            case 4: return [2 /*return*/, res.status(409).send({ error: true, msg: "User already exist" })];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _c.sent();
                (0, http_exception_1.sendErrorMsg)(error_1, res);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createUserAccount = createUserAccount;
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _b = (_a = res).send;
                return [4 /*yield*/, (0, user_service_1.findAllUsers)()];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            case 2:
                error_2 = _c.sent();
                (0, http_exception_1.sendErrorMsg)(error_2, res);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getUserById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, id, _a, _b, error_3;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                data = __assign({}, req.body);
                id = data.id;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                _b = (_a = res).send;
                return [4 /*yield*/, (0, user_service_1.findUserById)(id)];
            case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            case 3:
                error_3 = _c.sent();
                (0, http_exception_1.sendErrorMsg)(error_3, res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var getUserByEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, email, _a, _b, error_4;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                data = __assign({}, req.body);
                email = data.email;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                _b = (_a = res).send;
                return [4 /*yield*/, (0, user_service_1.findUserByEmail)(email)];
            case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            case 3:
                error_4 = _c.sent();
                (0, http_exception_1.sendErrorMsg)(error_4, res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getUserByEmail = getUserByEmail;
var userLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, email, password, result, user, token, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = __assign({}, req.body);
                email = data.email, password = data.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, user_service_1.findUserByEmail)(email)];
            case 2:
                result = _a.sent();
                if (typeof result === "object" && result !== null) {
                    user = result;
                    if (user.password == password) {
                        token = jwt.sign({
                            id: user.id,
                            fname: user.fname,
                            lname: user.lname,
                            email: user.email,
                            age: user.age,
                        }, process.env.JWT_SECRET, { expiresIn: "86400s" });
                        return [2 /*return*/, res.send({ status: 200, token: token }).send()];
                    }
                    else {
                        return [2 /*return*/, res.send({
                                error: true,
                                msg: "Incorrect email or password !",
                            })];
                    }
                }
                else {
                    return [2 /*return*/, res.send({
                            error: true,
                            msg: "User not found",
                        })];
                }
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                (0, http_exception_1.sendErrorMsg)(error_5, res);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.userLogin = userLogin;
