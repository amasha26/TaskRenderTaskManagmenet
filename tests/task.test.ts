import { response } from "express";
import { describe, it } from "node:test";

var cha = require('chai');
const chaiHttp = require('chai-http');

const server = require("../index");

cha.should();
cha.use(chaiHttp);

describe("Tasks API", () => { 
    describe("Get all tasks", () => { 
        it("It should return all the tasks", (done) => { 
            cha.request(server).get("api/get-alltasks").end((err, response) => { 
                response.should.have.status(200);
                done();
            })
        })
    })
})
