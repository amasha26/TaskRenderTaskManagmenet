"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_2 = __importDefault(require("mongoose"));
var Task = new mongoose_1.Schema({
    id: { type: mongoose_2.default.Schema.Types.ObjectId, required: false },
    title: String,
    uid: String,
    description: String,
    isCompleted: Boolean,
    createdAt: String,
    updatedAt: String,
});
var tasks = mongoose_2.default.model("tasks", Task);
exports.default = tasks;
