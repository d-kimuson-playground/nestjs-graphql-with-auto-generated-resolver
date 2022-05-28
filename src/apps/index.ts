import { Module } from "@nestjs/common"
import { GraphQLAppModule } from "src/apps/graphql-app/graphql-app.module"
import { GeneratedGraphqlAppModule } from "./generated-graphql-app/generated-graphql-app.module"
import { RestAppModule } from "./rest-app/rest-app.module"

@Module({
  imports: [GeneratedGraphqlAppModule, RestAppModule, GraphQLAppModule],
})
export class AppModule {}
