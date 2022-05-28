import "reflect-metadata"
import { resolve } from "path"
import { ApolloDriver } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { UserCrudResolver } from "@prisma-generated/type-graphql"
import { PrismaClient } from "@prisma/client"
import { buildSchema } from "type-graphql"
import type { ApolloDriverConfig } from "@nestjs/apollo"
import type { DynamicModule } from "@nestjs/common"
import type { Context } from "apollo-server-core"
import type { GraphQLSchema } from "graphql"

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
        driver: ApolloDriver,
        context: (): Context => ({ prisma: new PrismaClient() }),
        schema: schema,
        debug: true,
        playground: true,
      })
    })(),
  ],
})
export class GraphqlAppModule {}
