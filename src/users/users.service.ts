import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { toUserDto } from './helpers/converter';
import * as bcrypt from 'bcrypt';
// export type User = any;
@Injectable()
export class UsersService {
  constructor(private db: UserRepository) {}

  // private readonly users = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //   },
  // ];

  async add(userDto: CreateUserDto) {
    const { username, password, email } = userDto;
    const criptPawword = bcrypt.hashSync(password, 8);

    const userInDb = await this.db.findOne({
      where: { username },
    });

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: User = await this.db.create({
      username,
      email,
      password: criptPawword,
    });
    // console.log('salvar');
    await this.db.save(user);
    // console.log('aqui');
    return toUserDto(user);
    // const newUser = this.db.create(user);
  }

  // async findOne(username: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.username === username);
  // }
  findOne(username: string) {
    return this.db.findOne({
      where: { username },
    });
  }
  async findAll(): Promise<UserDto[]> {
    const usersEntity = await this.db.find();
    return usersEntity.map((element) => toUserDto(element));
  }
}
