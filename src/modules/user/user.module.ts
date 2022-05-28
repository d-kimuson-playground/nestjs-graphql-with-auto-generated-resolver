import { Module } from "@nestjs/common"
import { PrismaService } from "../../services/prisma.service"
import { UserRepository } from "./user.repository"

@Module({
  providers: [PrismaService, UserRepository],
  exports: [],
})
export class UserModule {}
