import { NestFactory } from "@nestjs/core"
import { setupApp } from "src/apps/setup"
import { AppModule } from "./apps"

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  setupApp(app)

  await app.listen(3000)
}
bootstrap()
