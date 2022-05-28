import { Test } from "@nestjs/testing"
import type { TestingModule } from "@nestjs/testing"
import { PrismaService } from "../../services/prisma.service"
import { UserRepository } from "./user.repository"

describe("UserRepository", () => {
  let repository: UserRepository
  let prisma: PrismaService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UserRepository],
    }).compile()

    repository = module.get<UserRepository>(UserRepository)
    prisma = module.get<PrismaService>(PrismaService)
  })

  afterAll(async () => {
    prisma.user.deleteMany()
  })

  it("fetchUser", async () => {
    prisma.user.create({
      data: {
        id: 1,
        email: "example@mail.com",
        name: "example",
      },
    })
    const result = repository.fetchUserById(1)
    expect(result).toBeDefined()
  })
})
