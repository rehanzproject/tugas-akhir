import chai, { expect } from "chai";
import app from "../index.js";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const url = "/api/v1/user";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJfaWQiOiI4NDc5YjFjMC1kYWU0LTQ4ZTUtOTViMy04YzU1OTM2MzJmOTgiLCJlbWFpbCI6InRlc3RAMTIzNDUiLCJpYXQiOjE2OTQ2ODU4NDEsImV4cCI6MTY5NDY4OTQ0MX0.LT3ECGYJPYVBZRbNy8PJxn5iNUkQmk42gW_KeQjYBLU";
//#region Course test
describe("Course Endpoint", () => {
  it("Should get Course", (done) => {
    chai
      .request(app)
      .get(`${url}/course`)
      .set("Authorization", `Bearer ${token}`) // Set the bearer token here
      .query({ size: 2, page: 1 }) // Add query parameters here
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("data").that.is.an("array"); // Check if the property "data" is an array
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
      .send({ name: "Github Tutorial", desc: "Lorem", price: 10000, rating: 5 })
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
      .query({ id: "314e0852-1237-4787-96ea-740110bcf23a" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("status").equal("Created");
        done();
      });
  });
});
//#endregion
