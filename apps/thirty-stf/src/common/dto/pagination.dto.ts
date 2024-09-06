import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    type: Number,
    default: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page: number = 1;

  @ApiProperty({
    type: Number,
    default: 10,
    required: false,
  })
  @IsOptional()
  @Max(100)
  @IsInt()
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  @IsIn(['asc', 'desc', 'ASC', 'DESC'])
  @Transform((sort_id) => sort_id.value.toUpperCase())
  @ApiProperty({
    type: String,
    default: 'DESC',
    required: false,
  })
  sortBy?: 'ASC' | 'DESC' = 'DESC';

  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({
    type: String,
    default: 'createdAt',
    required: false,
  })
  orderBy?: string = 'createdAt';

  @IsOptional()
  @IsString()
  route: string;
}
