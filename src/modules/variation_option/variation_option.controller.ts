import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { VariationOptionService } from './variation_option.service';
import { Protected, Roles } from '@decorators';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserRoles } from '../user/enums/user-roles.enum';
import { CreateVariationOptionDto } from './dto/create-variation_option.dto';
import { UpdateVariationOptionDto } from './dto/update-variation_option.dto';

@Controller('variation-options')
export class VariationOptionController {
  constructor(
    private readonly variationOptionService: VariationOptionService,
  ) {}

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Post()
  async create(@Body() dto: CreateVariationOptionDto) {
    return this.variationOptionService.create(dto);
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get()
  async findAll() {
    return this.variationOptionService.findAll();
  }

  @Protected(false)
  @Roles([UserRoles.admin, UserRoles.user])
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.variationOptionService.findOne(+id);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateVariationOptionDto) {
    return this.variationOptionService.update(+id, dto);
  }

  @ApiBearerAuth()
  @Protected(true)
  @Roles([UserRoles.admin])
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.variationOptionService.remove(+id);
  }
}
