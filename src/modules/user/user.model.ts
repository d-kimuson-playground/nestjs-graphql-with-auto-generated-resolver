import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType({ description: "user" })
export class User {
  @Field((_type) => ID)
  public id: number
  @Field()
  public email: string
  @Field(() => String, { nullable: true })
  public name: string | null
}
