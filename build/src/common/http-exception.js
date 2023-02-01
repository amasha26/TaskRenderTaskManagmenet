"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorMsg = void 0;
var sendErrorMsg = function (err, res) {
    console.log(err.stack);
    return res.status(500).send({
        error: true,
        msg: "Something went wrong please try again",
    });
};
exports.sendErrorMsg = sendErrorMsg;
