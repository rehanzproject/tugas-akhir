import chai, { expect } from "chai";
import app from "../index.js";
import chaiHttp from "chai-http";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiHttp);
const url = "/api/v1/user";
const token = process.env.TOKEN;
//#region Checkout  test
describe("Checkout  Endpoint", () => {
  it("Should get Checkout from user", (done) => {
    chai
      .request(app)
      .get(`${url}/checkout/history`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("data").that.is.an("array");
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
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("data").that.is.an("array");
        done();
      });
  });
});

//#endregion
