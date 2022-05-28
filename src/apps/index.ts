import { Module } from "@nestjs/common"
import { GeneratedGraphqlAppModule } from "./generated-graphql-app/generated-graphql-app.module"
import { RestAppModule } from "./rest-app/rest-app.module"

@Module({
  imports: [GeneratedGraphqlAppModule, RestAppModule],
})
export class AppModule {}
