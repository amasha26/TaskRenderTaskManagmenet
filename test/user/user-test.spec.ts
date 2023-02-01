import * as chai from "chai";
import chaiHttp = require("chai-http");
chai.use(chaiHttp);
import { request, expect } from "chai";
import { doesNotMatch } from "assert";

describe("USER API CHECK", () => {
  describe("GET ALL TASKS", () => {
    it("It should return all available tasks with status 200", async () => {
      const res = await request("http://localhost:8000").get(
        "/api/user/get-allusers"
      );
      console.log(res.body);
      expect(res).to.have.status(200);
      expect(res).to.be.a("object");
    });

    it("It should return task according to given user id with status 200", async () => {
      const res2 = await request("http://localhost:8000")
        .get("/api/user/get-userbyid")
        .send({ id: "63d908dd3c2af5df5cf03fa2" });
      console.log(res2.body);
      expect(res2).to.have.status(200);
      expect(res2).to.be.a("object");
    });

    it("Create new user acc should return status 200", async () => {
      const res2 = await request("http://localhost:8000")
        .post("/api/user/create")
        .send({fname:"user fname test",lname:"user lname test",email:"user@gmail.com",age:"34",password:"password#",confirmPassword:"password#"});
      console.log(res2.body);
      expect(res2).to.have.status(200);
      expect(res2).to.be.a("object");
    });
  });
});
