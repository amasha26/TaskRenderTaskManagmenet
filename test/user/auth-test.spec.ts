import * as chai from "chai";
import chaiHttp = require("chai-http");
chai.use(chaiHttp);
import { request, expect } from "chai";
import { doesNotMatch } from "assert";

describe("LOGIN CHECK", () => {
    it("check login function according to given email and password. success login should return status 200", async () => {
      const res = await request("http://localhost:8000")
        .post("/api/user/login")
        .send({
          email: "user@gmail.com",
          password: "password#",
        });
      console.log(res.body);
      expect(res).to.have.status(200);
      expect(res).to.be.a("object");
    });
  });

