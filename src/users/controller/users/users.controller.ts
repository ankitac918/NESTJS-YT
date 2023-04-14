import {
  ClassSerializerInterceptor,
  Controller,
  ParseIntPipe,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { UsersService } from 'src/users/service/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor) //used for hide password here
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor) //used for hide password here
  @Get('/:username')
  getByUsername(@Param('username') usrername: string) {
    const user = this.userService.getUserByUsername(usrername);
    if (user) return new SerializedUser(user);
    // SerializedUser(user) <-- hide passwords
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }

  @UseInterceptors(ClassSerializerInterceptor) //used for hide password here
  @Get('/search/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (user) return new SerializedUser(user);
    else throw new UserNotFoundException();
  }
}
