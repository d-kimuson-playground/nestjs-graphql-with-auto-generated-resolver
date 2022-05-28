import { NotFoundException } from "@nestjs/common"
import { Args, Query, Resolver } from "@nestjs/graphql"
import { User } from "src/modules/user/user.model"
import { UserRepository } from "src/modules/user/user.repository"

@Resolver((_of: never) => User)
export class UserResolver {
  public constructor(private readonly userRepository: UserRepository) {}

  @Query((_returns) => User)
  public async user(@Args("id") id: number): Promise<User> {
    const user = await this.userRepository.fetchUserById(id)
    if (typeof user === "undefined") {
      throw new NotFoundException(id)
    }

    return user
  }
}
