import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }
  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }
}
