import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiHttp);
const url = "/api/v1/user";
const token = process.env.TOKEN;
const REFRESHTOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJfaWQiOiJiNWU5OTg3YS03ZmM5LTQzZGQtYWMyOC05YmQ5OGNhN2U4YWQiLCJlbWFpbCI6ImFkbWluQDEyMzQ1IiwiaWF0IjoxNjk0NzQ1MDU3LCJleHAiOjE2OTQ4MzE0NTd9.RUOncJnhk7tbhrY5hQvjeHAzkAxnI3j5cgDRYO0LbZw";
//#region login test
describe("Login Endpoint", () => {
  it("should return a valid token when given correct credentials", (done) => {
    chai
      .request(app)
      .post(`${url}/login`)
      .send({ email: "admin@12345", password: "rehanm123" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("status").equal("OK");
        done();
      });
  });
  // incorrect email + password
  it("should return an error when given incorrect credentials", (done) => {
    chai
      .request(app)
      .post(`${url}/login`)
      .send({ email: "incorrectuser", password: "incorrectpassword" })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  // incorrect login
  it("should return an error when Wrong Password", (done) => {
    chai
      .request(app)
      .post("/api/v1/user/login")
      .send({ email: "admin@12345", password: "incorrectpassword" }) // Provide incorrect credentials
      .end((err, res) => {
        expect(res).to.have.status(400); // Assuming 400
        expect(res.body).to.have.property("message").equal("Wrong Password");
        done();
      });
  });
});
//#endregion

//#region Register Endpoint
describe("Register Endpoint", () => {
  //#region New User
  it("Should Make New User", (done) => {
    chai
      .request(app)
      .post(`${url}/register`)
      .send({
        name: "rehan koding",
        email: "hehehe@1234",
        password: "rehanm123",
        confPassword: "rehanm123",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.be.have.property("message")
          .equal("User Register Successfully");
        done();
      });
  });
  //#endregion
  it("Should Error While get new user", (done) => {
    chai
      .request(app)
      .post(`${url}/register`)
      .send({
        name: "rehan koding",
        email: "admin@12345",
        password: "rehanm123",
        confPassword: "rehanm123",
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body)
          .to.be.have.property("message")
          .equal("Email has already been registered");
        done();
      });
  });
});
//#endregion

//#region Log out test
describe("Log out Endpoint", () => {
  it("Should Log out user", (done) => {
    chai
      .request(app)
      .delete(`${url}/logout`)
      .set("Cookie", `refreshToken=${REFRESHTOKEN}`) // Set the cookie here
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("status").equal("OK");
        done();
      });
  });
});
//#endregion

//#region Ping test
describe("Ping Endpoint", () => {
  it("Should get Ping", (done) => {
    chai
      .request(app)
      .get(`${url}/ping`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
//#endregion

//#region Get User By Email test
describe("Get User By Email Endpoint", () => {
  it("Should get Info User by email", (done) => {
    chai
      .request(app)
      .get(`${url}/info`)
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("data").that.is.an("object");
        expect(res.body).to.have.property("status").equal("OK");
        done();
      });
  });
});
//#endregion
