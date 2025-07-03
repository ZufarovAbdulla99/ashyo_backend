import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Protected, Roles } from '@decorators';
import { UserRoles } from './enums/user-roles.enum';
import { User } from './models/user.model';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  #_service: UserService;
  constructor(service: UserService) {
    this.#_service = service;
  }

  @ApiOperation({ summary: 'Hamma userlarni olish' })
  @Protected(true)
  @Roles([UserRoles.admin])
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.#_service.getAllUsers();
  }

  @ApiOperation({ summary: 'Yagona userlarni olish' })
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get('/:id')
  @ApiOperation({ summary: 'Yagona userni olish' })
  async getSingleUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.#_service.getSingleUser(id);
  }

  @ApiOperation({ summary: 'Userni creat qilish' })
  @ApiConsumes('multipart/form-data')
  @Post('/add')
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @UseInterceptors(FileInterceptor('image'))
  async createUser(
    @Body() createUserPayload: CreateUserDto,
    @UploadedFile() image: Express.Multer.File
  ): Promise<{ message: string; new_user: CreateUserDto }> {
    await this.#_service.createUser(createUserPayload, image);
    return {
      message: 'User created successfully',
      new_user: createUserPayload,
    };
  }

  @ApiOperation({ summary: 'Userni yangilash' })
  @ApiConsumes('multipart/form-data')
  @Protected(true)
  @Roles([UserRoles.admin, UserRoles.user])
  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserPayload: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<{ message: string; updatedUser: User }> {
    const result = await this.#_service.updateUser(
      +id,
      updateUserPayload,
      file,
    );

    return {
      message: 'User updated successfully',
      updatedUser: result.updatedUser,
    };
  }

  @ApiOperation({ summary: "Userni o'chirish" })
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    return this.#_service.deleteUser(+id);
  }
}
