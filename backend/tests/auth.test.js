
const request = require("supertest");
const app = require("../server");

describe("Authentication API", () => {
  test("Signup should reject missing fields", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({});

    expect(response.statusCode).toBe(400);
  });

  test("Login should reject missing fields", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({});

    expect(response.statusCode).toBe(400);
  });

  test("Signup should reject short password", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123"
      });

    expect(response.statusCode).toBe(400);
  });
});
