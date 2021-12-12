import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";

let connection: Connection;

const email = "hrq3@email.com";
const password = "hrq123";

describe("AuthenticateUserController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able authenticate user", async () => {
    await request(app)
      .post("/api/v1/users")
      .send({ password, email, name: "Henrique" });

    const response = await request(app)
      .post("/api/v1/sessions")
      .send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id");
    expect(response.body.user.name).toEqual("Henrique");
    expect(response.body.user.email).toEqual(email);
  });

  it("Should not be able to authenticate user not exists", async () => {
    const response = await request(app)
      .post("/api/v1/sessions")
      .send({ email: "usarioInexistente@email.com", password });

    expect(response.status).toBe(401);
  });

  it("Should not be able to authenticate user with password wrong", async () => {
    const response = await request(app)
      .post("/api/v1/sessions")
      .send({ email, password: "SenhaErrada" });

    expect(response.status).toBe(401);
  });
});
