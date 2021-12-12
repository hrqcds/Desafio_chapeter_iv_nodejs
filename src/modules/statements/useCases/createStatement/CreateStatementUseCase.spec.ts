import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let statementRepository: IStatementsRepository;
let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

describe("CreateStatemanteUseCase", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    statementRepository = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    createStatementUseCase = new CreateStatementUseCase(
      usersRepository,
      statementRepository
    );
  });

  it("Should be able to create statement", async () => {
    const user = await createUserUseCase.execute({
      name: "teste",
      email: "teste@email.com",
      password: "teste",
    });
  });
});
