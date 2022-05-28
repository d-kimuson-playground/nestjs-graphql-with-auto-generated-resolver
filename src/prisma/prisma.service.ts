import { Injectable } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import type { INestApplication, OnModuleInit } from "@nestjs/common"
import { updateApolloContext } from "src/main"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public async onModuleInit(): Promise<void> {
    await this.$connect()
    updateApolloContext(this)
  }

  public async enableShutdownHooks(app: INestApplication): Promise<void> {
    this.$on("beforeExit", async () => {
      await app.close()
    })
  }
}
