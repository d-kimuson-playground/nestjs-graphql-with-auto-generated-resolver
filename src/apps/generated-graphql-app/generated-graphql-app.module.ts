import "reflect-metadata"
import { resolve } from "path"
import { ApolloDriver } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { UserCrudResolver } from "@prisma-generated/type-graphql"
import { buildSchema } from "type-graphql"
import type { ApolloDriverConfig } from "@nestjs/apollo"
import type { DynamicModule } from "@nestjs/common"
import type { GraphQLSchema } from "graphql"
import { PrismaService } from "../../services/prisma.service"

export const generateSchema = async (): Promise<GraphQLSchema> => {
  const resolvers = [UserCrudResolver] as const

  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: resolve(__dirname, "./generated-schema.graphql"),
    validate: false,
  })

  return schema
}

@Module({
  imports: [
    (async (): Promise<DynamicModule> => {
      const schema = await generateSchema()

      return GraphQLModule.forRoot<ApolloDriverConfig>({
        path: "generated/graphql",
        driver: ApolloDriver,
        schema: schema,
        debug: process.env["NODE_ENV"] === "development",
        playground: process.env["NODE_ENV"] === "development",
      })
    })(),
  ],
  providers: [PrismaService],
})
export class GeneratedGraphqlAppModule {}
