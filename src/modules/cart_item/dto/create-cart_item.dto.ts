import { IsNotEmpty, Min, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// CreateCartItemDto
export class CreateCartItemDto {

  @ApiProperty({
    description: 'The ID of the user',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsPositive()
  user_id: number;

  @ApiProperty({
    description: 'The ID of the product',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsPositive()
  product_id: number;

  @ApiProperty({
    description: 'The quantity of the product in the cart',
    example: 2,
    minimum: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'The price of the product',
    example: 29.99,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  @IsPositive()
  price: number;
}