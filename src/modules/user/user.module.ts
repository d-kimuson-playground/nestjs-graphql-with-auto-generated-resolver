import { Module } from "@nestjs/common"
import { UserResolver } from "src/modules/user/user.resolver"
import { PrismaService } from "../../services/prisma.service"
import { UserRepository } from "./user.repository"

@Module({
  providers: [PrismaService, UserResolver, UserRepository],
  exports: [],
})
export class UserModule {}
