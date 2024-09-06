import { RoleEnum } from '@app/thirty-stf-repository/enum/entity.enum';
import { PrismaService } from '@app/thirty-stf-repository/prisma/prisma.service';
import { CreateUserInput } from '@app/thirty-stf-repository/user/user.model';
import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(protected readonly prisma: PrismaService) {}

  async saveUserInfo(createUserInfo: CreateUserInput): Promise<users> {
    const role = await this.prisma.roles.findFirst({
      where: {
        type: RoleEnum.PASSENGER,
      },
    });
    const existingUser = await this.prisma.users.findFirst({
      where: {
        OR: [
          { auth0UserId: createUserInfo.auth0UserId },
          { email: createUserInfo.email },
        ],
      },
    });
    if (existingUser) {
      return existingUser;
    }
    return await this.prisma.users.create({
      data: {
        id: createUserInfo.id,
        firstName: createUserInfo.firstName,
        lastName: createUserInfo.lastName,
        title: createUserInfo.title,
        phone: createUserInfo.phone,
        email: createUserInfo.email,
        auth0UserId: createUserInfo.auth0UserId,
        address: createUserInfo.address || '-',
        roleId: role.id,
      },
    });
  }

  async getUserInfo(id: string): Promise<users> {
    return await this.prisma.users.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }
}
