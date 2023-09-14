# TEMPLATE UNIT TEST FOR

//#region Get Users test
describe("Get Users Endpoint", () => {
it("Should get All Users", (done) => {
chai
.request(app)
.get(`${url}`)
.end((err, res) => {
expect(res).to.have.status(200);
expect(res.body).to.have.property("status").equal("OK")
done();
});
});
});
//#endregion

//#region Add Course test
describe("Add Course Endpoint", () => {
it("Should add new Course", (done) => {
chai
.request(app)
.post(`${url}/addcourse`)
.set('Authorization', `Bearer ${token}`)
.send({"name":"Github Tutorial", "desc":"Lorem", "price":10000, "rating":5})
.query({id: '314e0852-1237-4787-96ea-740110bcf23a'})
.end((err, res) => {
expect(res).to.have.status(200);
expect(res.body).to.have.property("status").equal("OK")
done();
});
});
});
//#endregion
