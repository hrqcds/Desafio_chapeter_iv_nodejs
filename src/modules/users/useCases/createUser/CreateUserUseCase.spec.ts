import bcrypt from "bcryptjs";

import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("Should be able to create user", async () => {
    const user = await createUserUseCase.execute({
      name: "Henrique",
      email: "hrq@email.com",
      password: "hrq",
    });

    expect(user).toHaveProperty("id");
    expect(user.name).toEqual("Henrique");
    expect(user.email).toEqual("hrq@email.com");
  });

  it("Should be not able to create user with same email", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Henrique",
        email: "hrq@email.com",
        password: "hrq",
      });

      await createUserUseCase.execute({
        name: "Henrique2",
        email: "hrq@email.com",
        password: "hrq2",
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  });
});
