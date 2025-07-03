import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateLikeRequest } from "../interfaces/create-like.interface";

export class CreateLikeDto implements CreateLikeRequest{
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