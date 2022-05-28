import { Injectable } from "@nestjs/common"
import type { User } from "@prisma/client"
import { PrismaService } from "../../services/prisma.service"

@Injectable()
export class UserRepository {
  public constructor(private prisma: PrismaService) {}

  public async fetchUserById(id: number): Promise<User | undefined> {
    const maybeUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    return maybeUser === null ? undefined : maybeUser
  }
}
