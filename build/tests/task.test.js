"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_test_1 = require("node:test");
var cha = require('chai');
var chaiHttp = require('chai-http');
var server = require("../index");
cha.should();
cha.use(chaiHttp);
(0, node_test_1.describe)("Tasks API", function () {
    (0, node_test_1.describe)("Get all tasks", function () {
        (0, node_test_1.it)("It should return all the tasks", function (done) {
            cha.request(server).get("api/get-alltasks").end(function (err, response) {
                response.should.have.status(200);
                done();
            });
        });
    });
});
