let chai = require("chai");
let server = require("../server");
let chaiHttp = require("chai-http");

var expect = chai.expect;
chai.use(require("chai-json-schema"));
let agent = require("supertest");

let host_url = "http://localhost:9000";
before(async function () {
  request = agent(host_url);
});

//assertion style
chai.should();
chai.use(chaiHttp);
let token =
  "eyJhbGciOiJIUzI1NiJ9.cml0aEBnbWFpbC5jb20.R5imQ9XPN05v2jp6ixDexXlJm08Kz-HqtktUGjm_yUc";
describe("Product test", () => {
  describe("GET products", () => {
    it("GET products", (done) => {
      chai
        .request(server)
        .get("/api/admin/getproduct")
        .set("content-Type", "application/json")
        .set("Accept", "application/json")
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("POST product", () => {
    it("product post", async () => {
      let products = {
        name: { type: "string" },
        description: { type: "string" },
        status: {
          type: "string",
        },
        category_id: {
          type: "number",
        },
        price: { type: "number" },
      };
      let product = {
        name: "shavarma",
        description: "tasty",
        status: "active",
        category_id: 1,
        price: 500,
      };
      expect(product).to.be.jsonSchema(products);
      let res = await request
        .post("/api/admin/products/create")
        .attach("image", "/home/toobler/Downloads/food pics/shawarma.jpg")
        .field("name", product.name)
        .field("description", product.description)
        .field("status", product.status)
        .field("category_id", product.category_id)
        .field("price", product.price)
        .set("content-Type", "application/json")
        .set("Accept", "application/json")
        .set("x-access-token", token)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an("object");
          expect(res.body.message).to.be.a("string");
        });
    });
  });

  describe("DELETE products to trash", () => {
    it("delete product details", async () => {
      let productId = {
        type: "number",
      };

      let Id = 4;
      expect(Id).to.be.jsonSchema(productId);
      let res = await request
        .put(`/api/admin/products/deleteProduct?id=${Id}`)
        .set("content-Type", "application/json")
        .set("Accept", "application/json")
        .set("x-access-token", token);
      expect(res.status).to.equal(203);

      expect(res.body).to.be.an("object");
      expect(res.body.message).to.be.a("string");
    });
  });

  describe("PUT products", () => {
    it("update product", async () => {
      let productId = {
        type: "number",
      };
      let Id = 6;
      expect(Id).to.be.jsonSchema(productId);

      let res = await request
        .put(`/api/admin/products/updateProduct?id=${Id}`)
        .attach("image", "/home/toobler/Downloads/food pics/shawarma.jpg")
        .field("name", "tomato rice")
        .field("description", "tomato rice")
        .field("status", "active")
        .field("category_id", 1)
        .field("price", 180)
        .set("content-Type", "application/json")
        .set("Accept", "application/json")
        .set("x-access-token", token);

      expect(res.status).to.equal(202);
      expect(res.body).to.be.an("object");
      expect(res.body.message).to.be.a("string");
    });
  });
});
