import { IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UpdateCommentRequest } from "../interfaces/update-comment.interface";

export class UpdateCommentDto implements UpdateCommentRequest {
    @ApiProperty({
        description: "Comment yozing",
        example: "zor telefon ekan",
        required: false,
        type: String
    })
    @IsOptional()
    @IsString()
    text: string;

    @ApiProperty({
        description: 'Foydalanuvchi ID raqami',
        example: 1,
        required: false,
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    user_id: number;

    @ApiProperty({
        description: 'Mahsulot ID raqami',
        example: 1,
        required: false,
        type: Number,
    })
    @IsOptional()
    @IsNumber()
    product_id: number;
}