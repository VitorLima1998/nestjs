import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LogInterceptor } from 'src/common/interceptors/log.interceptor';

@ApiTags('Users')
@Controller('user')
@UseInterceptors(LogInterceptor)
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
  @Get('/:email')
  async findByEmail(@Param('email') id: string) {
    return this.userService.findOne(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string, @Body() pwd: DeleteUserDto) {
    return this.userService.delete(id, pwd);
  }
}
