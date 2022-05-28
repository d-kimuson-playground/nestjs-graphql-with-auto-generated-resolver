import { getApolloServer } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import type { INestApplication } from "@nestjs/common"
import type { PrismaClient } from "@prisma/client"
import { AppModule } from "./app.module"
import { GraphqlAppModule } from "./graphql-app.module"

@Module({
  imports: [GraphqlAppModule, AppModule],
})
class RootModule {}

export const { updateApolloContext, setupApp } = ((): {
  updateApolloContext: (prisma: PrismaClient) => Promise<void>
  setupApp: (app: INestApplication) => void
} => {
  let resolveApp: (
    value: INestApplication | PromiseLike<INestApplication>
  ) => void
  let rejectApp: (reason?: unknown) => void

  const appPromise: Promise<INestApplication> = new Promise<INestApplication>(
    (resolve, reject) => {
      resolveApp = resolve
      rejectApp = reject
    }
  )

  setTimeout(() => {
    rejectApp("TIMEOUT")
  }, 10000)

  const updateApolloContext = async (prisma: PrismaClient): Promise<void> => {
    const app = await appPromise
    const apolloServer = getApolloServer(app)
    apolloServer.requestOptions.context = {
      prisma,
    }
  }

  const setupApp = (app: INestApplication): void => {
    resolveApp(app)
  }

  return {
    updateApolloContext,
    setupApp,
  }
})()

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(RootModule)
  setupApp(app)

  await app.listen(3000)
}
bootstrap()
