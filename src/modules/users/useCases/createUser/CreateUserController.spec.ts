import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

let connection: Connection;

describe("CreateUserController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Shoud be able to create user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "Henrique",
      email: "hrq2@email.com",
      password: "hrq",
    });

    expect(response.status).toBe(201);
  });

  it("Shoud be not able to create user with same email", async () => {
    await request(app).post("/api/v1/users").send({
      name: "teste",
      email: "teste@email.com",
      password: "hrq",
    });

    const response = await request(app).post("/api/v1/users").send({
      name: "teste",
      email: "teste@email.com",
      password: "teste",
    });

    expect(response.status).toBe(400);
  });
});
