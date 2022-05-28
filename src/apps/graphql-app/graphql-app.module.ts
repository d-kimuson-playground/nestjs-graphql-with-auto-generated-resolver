import { join } from "path"
import { ApolloDriver } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { DirectiveLocation, GraphQLDirective } from "graphql"
import type { ApolloDriverConfig } from "@nestjs/apollo"
import { UserModule } from "src/modules/user/user.module"
import { PrismaService } from "src/services/prisma.service"

@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      path: "hand-write/graphql",
      driver: ApolloDriver,
      autoSchemaFile: join(__dirname, "./schema.graphql"),
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: "upper",
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      debug: process.env["NODE_ENV"] === "development",
      playground: process.env["NODE_ENV"] === "development",
    }),
  ],
  providers: [PrismaService],
})
export class GraphQLAppModule {}
