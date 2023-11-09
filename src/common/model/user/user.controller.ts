import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UpdateUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { LogInterceptor } from 'src/common/interceptors/log.interceptor';
import { ParamId } from 'src/common/decorators/param-id.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
// import { Role } from '@prisma/client';
// import { Roles } from 'src/common/decorators/roles.decorator';

// @Roles(Role.ADMIN)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }
  @Get()
  async read() {
    return this.userService.readAll();
  }

  @Get('/:id')
  async readOne(@ParamId() id: string) {
    console.log({ id });

    return this.userService.readOne(id);
  }
  @Put('/:id')
  async update(@Body() data: UpdateUserDTO, @Param('id') id: string) {
    return this.userService.update(id, data);
  }
  @Patch('/:id')
  async updatePartial(
    @Body() data: UpdatePatchUserDTO,
    @Param('id') id: string,
  ) {
    return this.userService.updatePartial(id, data);
  }
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
