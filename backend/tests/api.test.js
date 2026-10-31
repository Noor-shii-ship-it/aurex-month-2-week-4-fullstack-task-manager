const request = require("supertest");
const app = require("../server");

describe("API Home Route", () => {
  test("GET / should return success message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe(
      "AUREX Month 2 Week 4 API is running!"
    );
  });

  test("Unknown route should return 404", async () => {
    const response = await request(app).get("/unknown-route");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Route not found.");
  });
});