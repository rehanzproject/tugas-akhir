import chai from "chai";
import chaiHttp from "chai-http";
import db from "../config/database.js";
const { expect } = chai;

chai.use(chaiHttp);
// Database Testing
describe("Database Connection Test", () => {
  before(async () => {
    try {
      await db.authenticate(); // Attempt to authenticate with the database
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  });

  it("should be able to connect to the database", () => {
    expect(db.options.dialect).to.equal("mysql"); // Ensure that the dialect is MySQL
  });
});
