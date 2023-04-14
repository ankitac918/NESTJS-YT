import { Injectable } from '@nestjs/common';
import { SerializedUser, User } from '../../types';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'ankit',
      password: 'ankit',
    },
    {
      id: 2,
      username: 'raj',
      password: 'raj',
    },
    {
      id: 3,
      username: 'jitu',
      password: 'jitu',
    },
    {
      id: 4,
      username: 'dinesh',
      password: 'dinesh',
    },
  ];

  getUsers() {
    return this.users.map((user) => new SerializedUser(user)); //.map... is user to hide password
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
