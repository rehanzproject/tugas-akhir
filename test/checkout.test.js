import chai, { expect } from "chai";
import app from "../index.js";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const url = "/api/v1/user";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJfaWQiOiI4NDc5YjFjMC1kYWU0LTQ4ZTUtOTViMy04YzU1OTM2MzJmOTgiLCJlbWFpbCI6InRlc3RAMTIzNDUiLCJpYXQiOjE2OTQ2ODU4NDEsImV4cCI6MTY5NDY4OTQ0MX0.LT3ECGYJPYVBZRbNy8PJxn5iNUkQmk42gW_KeQjYBLU";
//#region Checkout  test
describe("Checkout  Endpoint", () => {
  it("Should get Checkout from user", (done) => {
    chai
      .request(app)
      .get(`${url}/checkout/history`)
      .set("Authorization", `Bearer ${token}`) // Set the bearer token here
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("data").that.is.an("array"); // Check if the property "data" is an array
        done();
      });
  });
});

//#endregion

//#region Get Checkout test
describe("Get Checkout Endpoint", () => {
  it("Should get Get Checkout", (done) => {
    chai
      .request(app)
      .get(`${url}/checkout/history`)
      .set("Authorization", `Bearer ${token}`) // Set the bearer token here
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("data").that.is.an("array"); // Check if the property "data" is an array
        done();
      });
  });
});

//#endregion
