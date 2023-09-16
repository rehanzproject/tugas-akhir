import chai, { expect } from "chai";
import app from "../index.js";
import chaiHttp from "chai-http";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiHttp);
const url = "/api/v1/user";
const token = process.env.TOKEN;
//#region Course test
describe("Course Endpoint", () => {
  it("Should get Course", (done) => {
    chai
      .request(app)
      .get(`${url}/course`)
      .set("Authorization", `Bearer ${token}`)
      .query({ size: 2, page: 1 })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("data").that.is.an("array");
        done();
      });
  });
});

//#endregion

//#region Add Course test
describe("Add Course Endpoint", () => {
  it("Should Add Course", (done) => {
    chai
      .request(app)
      .post(`${url}/addcourse`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Pengenalan masa orientasi", desc: "Lorem", price: 10000 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("status").equal("Created");
        done();
      });
  });
});
//#endregion

//#region Add Module test
describe("Add Module Endpoint", () => {
  it("Should add Modules", (done) => {
    chai
      .request(app)
      .post(`${url}/addmodule`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Github Tutorial", desc: "Lorem" })
      .query({ id: "b67aa998-dc0b-4d51-b8e8-e37c5951315d" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("status").equal("Created");
        done();
      });
  });
});
//#endregion
