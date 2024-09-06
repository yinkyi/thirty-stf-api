import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'apps/thirty-stf/src/common/decorator/get-user.decorator';
import { AuthUserI } from '@app/auth0/interface';
import { Auth0Service } from '@app/auth0';
import { TitleEnum } from '@app/thirty-stf-repository/enum/entity.enum';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly auth0Service: Auth0Service,
  ) {}

  @Post()
  async create(@Body() option: CreateUserDto) {
    const decoded = await this.auth0Service.decodeIdToken(option.idToken);
    return await this.userService.create({
      id: decoded.userId,
      auth0UserId: decoded.auth0UserId,
      email: decoded.email || '-',
      firstName: decoded.name,
      lastName: '',
      title: TitleEnum.OTHER,
      phone: '-',
    });
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  findOne(@GetUser() user: AuthUserI) {
    return this.userService.findOne(user.userId);
  }
}
