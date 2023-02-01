"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var User = new mongoose_1.Schema({
    id: { type: mongoose_2.default.Schema.Types.ObjectId, required: false },
    fname: String,
    lname: String,
    age: Number,
    email: String,
    password: String,
});
var users = mongoose_2.default.model("users", User);
exports.default = users;
