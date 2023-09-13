# TEMPLATE UNIT TEST FOR

//#region Get Users test
describe("Get Users Endpoint", () => {
it("Should get All Users", (done) => {
chai
.request(app)
.get(`${url}`)
.end((err, res) => {
expect(res).to.have.status(200);
expect(res.body).to.have.property("status").equal("OK") // Check if the response body is an array
done();
});
});
});
//#endregion
