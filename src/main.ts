import { Module } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { GraphqlAppModule } from "./graphql-app.module"

@Module({
  imports: [GraphqlAppModule, AppModule],
})
class RootModule {}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(RootModule)

  await app.listen(3000)
}
bootstrap()
