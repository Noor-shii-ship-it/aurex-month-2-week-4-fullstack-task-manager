
const request = require("supertest");
const app = require("../server");

describe("Task API Protection", () => {
  test("GET /api/tasks should reject requests without a token", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.statusCode).toBe(401);
  });

  test("POST /api/tasks should reject requests without a token", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task" });

    expect(response.statusCode).toBe(401);
  });
});
