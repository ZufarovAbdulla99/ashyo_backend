import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class UpdateMeDto {
  @ApiProperty({ example: 'Ali Valiyev', required: false })
  @IsOptional()
  @IsString()
  fullname?: string;

  @ApiProperty({ example: 'ali@mail.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '+998901234567', required: false })
  @IsOptional()
  @IsPhoneNumber('UZ')
  @Length(13, 13)
  phone_number?: string;

  @ApiProperty({ example: 'newPassword123', required: false })
  @IsOptional()
  @IsString()
  password?: string;
}