let chai = require("chai");
let server = require("../server");
let chaiHttp = require("chai-http");

var expect = chai.expect;
chai.use(require("chai-json-schema"));
let agent = require("supertest");
const { deleteOne } = require("../controllers/mongoauth/mongo_categories/mongo_Cat_model");

let host_url = "http://localhost:9000";
before(async function () {
  request = agent(host_url);
});

//assertion style
chai.should();
chai.use(chaiHttp);
let token =
  "eyJhbGciOiJIUzI1NiJ9.cml0aEBnbWFpbC5jb20.R5imQ9XPN05v2jp6ixDexXlJm08Kz-HqtktUGjm_yUc";

describe("User test", () => {
  describe(" USER  SIGNUP", () => {
    it("signup user", async () => {
      let userSchema = {
        first_name: { type: "string" },
        last_name: { type: "string" },
        email: {
          type: "string",
        },
        phone_number: {
          type: "string",
        },
        password: { type: "string" },
        status: {
          type: "string",
        },
        created_by: {
          type: "number",
        },
      };

      let user = {
        first_name: "anandika",
        last_name: "ikili",
        email: "ikili@gmail.com",
        phone_number: "9945345121",
        password: "ikili@123",
        status: "active",
        created_by: 1,
      };

      expect(user).to.be.jsonSchema(userSchema);
      let res = await request.post("/api/user/insertuserdata").send(user);
      expect(res.status).to.equal(200);

      expect(res.body).to.be.an("object")

      console.log(res.body,"heeeeeeeeeeeeeeegtggggggggggggggggggggggggggggggggggggggeeeeei")
      var userData = res.body
     
      expect(userData.id).to.be.a("number")
      expect(userData.first_name).to.be.a("string")
      expect(userData.last_name).to.be.a("string")
      expect(userData.email).to.be.a("string")
      expect(userData.token).to.be.a("string")
      expect(userData.message).to.be.a("string")
    });
  });

  describe(" USER  SIGNIN", () => {
    it("user login", async (done) => {
      let userSchema = {
        email: {
          type: "number",
        },
        password: { type: "string" },
      };

      let user = { email: "ikili@gmail.com", password: "ikili@123" };

      expect(user).to.be.jsonSchema(userSchema);
      let res = await request.post("/api/user/insertuserdata").send(user);

      expect(res.status).to.equal(200);


      expect(res.body).to.be.an("object");
      done();
    });
  });

  describe("GET USER DETAILS", () => {
    it("get USER detail", async () => {
      let userIdSchema = {
        type: "number",
      };
      let userId = 1;
      expect(userId).to.be.jsonSchema(userIdSchema);
      let res = await request
        .get("/api/users/list?" + userId)
        .set("content-Type", "application/json")
        .set("Accept", "application/json")
        .set("x-access-token", token);

      expect(res.status).to.equal(200);
    });
  });
  describe("UPDATE USER DETAILS", () => {
    it("update user details", async () => {
      let userIdSchema = {
        type: "number",
      };
      let user = {
        first_name: "ikkili",
        last_name: "anand",
        email: "ikkili@gmail.com",
        phone_number: "9945345155",
        status: "active",
        role_id: 1,
      };
      let userId = 2;
      expect(userId).to.be.jsonSchema(userIdSchema);
      let res = await request
        .put(`/api/user/update?id=${userId}`)
        .send(user)
        .set("content-Type", "application/json")
        .set("Accept", "application/json")
        .set("x-access-token", token);

      expect(res.status).to.equal(202);

      expect(res.body).to.be.an("object");
      expect(res.body.message).to.be.a("string");
    });
  });

  describe("DELETE USER DETAILS", () => {
    it("delete user details", async () => {
      let userIdSchema = {
        type: "number",
      };

      let userId = 4;
      expect(userId).to.be.jsonSchema(userIdSchema);
      let res = await request
        .put(`/api/user/trash?id=${userId}`)
        .set("content-Type", "application/json")
        .set("Accept", "application/json")
        .set("x-access-token", token);

      expect(res.status).to.equal(206);
      expect(res.body).to.be.an("object");
      expect(res.body.message).to.be.a("string");
    });
  });
});
