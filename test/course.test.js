import chai, { expect } from "chai";
import app from "../index.js";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const url = '/api/v1/user'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsInVzZXJfaWQiOiI4NDc5YjFjMC1kYWU0LTQ4ZTUtOTViMy04YzU1OTM2MzJmOTgiLCJlbWFpbCI6InRlc3RAMTIzNDUiLCJpYXQiOjE2OTQ2NjI0MTEsImV4cCI6MTY5NDY2NjAxMX0.ciMBZlecl1aREeiE_X4lhsfbc5njmIYyXavyAdBPPT0'
//#region Course test
describe("Course Endpoint", () => {
    it("Should get Course", (done) => {
      chai
        .request(app)
        .get(`${url}/course`)
        .set('Authorization', `Bearer ${token}`)  // Set the bearer token here
        .query({ size: 2, page: 1 })  // Add query parameters here
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("data").that.is.an("array"); // Check if the property "data" is an array
          done();
        });
    });
  });
  
//#endregion