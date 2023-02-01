import * as chai from "chai";
import chaiHttp = require("chai-http");
chai.use(chaiHttp);
import { request, expect } from "chai";

describe("SERVER CHECK", () => {
  describe("server is running without errors", () => {
    it("Should GET to /api", async () => {
      const res = await request("http://localhost:8000").get("/api");
      expect(res).to.have.status(200);
      expect(res).to.be.a("object");
    });
  });
});
