import {
  Controller,
  Get,
  Param,
  Patch,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MeService } from './me.service';
import { Protected, Roles } from '@decorators';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRoles } from './enums/user-roles.enum';
import { UpdateMeDto } from './dtos/update-me.dto';

@Controller('me')
@ApiBearerAuth()
@ApiTags('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':id')
  @ApiOperation({ summary: 'Get single user info' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUser(@Param('id') id: number) {
    const user = await this.meService.getUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Patch(':id')
  @ApiOperation({ summary: 'Update user self data' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateUser(@Param('id') id: number, @Body() updateData: UpdateMeDto) {
    try {
      const updatedUser = await this.meService.updateUser(id, updateData);
      if (!updatedUser)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return updatedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}