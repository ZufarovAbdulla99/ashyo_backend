import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateBrandRequest } from '../interfaces/create-brand.interface';

export class CreateBrandDto implements Omit<CreateBrandRequest, 'image'> {
  @ApiProperty({
    type: String,
    required: true,
    example: 'BMW',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
  })
  image: string;
}
