import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  public async fetchUserById(id: number): Promise<User | undefined> {
    const maybeUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return maybeUser === null ? undefined : maybeUser;
  }
}
