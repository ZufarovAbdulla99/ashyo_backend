import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBannerDto {
  @ApiProperty({
    description: 'ID of the product associated with the banner',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  product_id?: number;

  @ApiProperty({
    description: 'ID of the category associated with the banner',
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  category_id?: number;

  @ApiProperty({
    description: 'Title of the banner',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the banner',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
    description: 'Image file for the banner',
  })
  @IsOptional()
  image?: string;

  @ApiProperty({
    description: 'Name of the banner',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;
}