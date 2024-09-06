import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from '@app/thirty-stf-repository/user/user.repository';
import { CreateUserInput } from '@app/thirty-stf-repository/user/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  async create(createUserInfo: CreateUserInput) {
    return await this.userRepo.saveUserInfo(createUserInfo);
  }

  async findOne(id: string) {
    return await this.userRepo.getUserInfo(id);
  }
}
