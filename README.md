# nestjs-graphql-with-auto-generated-resolver

NestJS 下で [Hasura](https://hasura.io/) っぽいこと(DB のスキーマから GraphQL の type, resolver まで自動生成する)を部分的にやる、みたいなことをしたくて試したリポジトリ

```bash
$ yarn dev
```

で開発サーバーが建つ

- http://localhost:3000/generated/graphql
- http://localhost:3000/hand-write/graphql

でそれぞれ DB スキーマから自動生成した GraphQL と手動で書いた GraphQL を叩ける

## 自動生成側

`yarn prisma generate` (prisma client の生成コマンド) を叩くと、一緒に type, resolver が自動生成される

```ts
export const generateSchema = async (): Promise<GraphQLSchema> => {
  const resolvers = [UserCrudResolver] as const

  const schema = await buildSchema({
    resolvers,
    emitSchemaFile: resolve(__dirname, "./generated-schema.graphql"),
    validate: false,
  })

  return schema
}
```

resolver に指定したリゾルバだけ使えるようになる
GraphQL スキーマは [./src/apps/generated-graphql-app/generated-schema.graphql](./src/apps/generated-graphql-app/generated-schema.graphql) に自動生成される

## 手動側

コードファーストでやったけど、スキーマファーストでも同じことができるはず

GraphQL スキーマは [./src/apps/graphql-app/schema.graphql](./src/apps/graphql-app/schema.graphql) に自動生成される
