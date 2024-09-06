import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { TitleEnum } from '@app/thirty-stf-repository/enum/entity.enum';

export class UpdateUserDto {
  @IsEnum(TitleEnum)
  @IsOptional()
  title: TitleEnum;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsPhoneNumber(null, {
    message: 'Phone number must be a valid international number',
  })
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
