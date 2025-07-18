import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateCartRequest } from "../interfaces/create-cart.interface";

export class CreateCartDto implements CreateCartRequest {
    @ApiProperty({
        description: 'Foydalanuvchi ID raqami',
        example: 1,
        required: true,
        type: Number,
    })
    @IsNumber()
    user_id: number;

    @ApiProperty({
        description: 'Mahsulot ID raqami',
        example: 1,
        required: true,
        type: Number,
    })
    @IsNumber()
    product_id: number;

}