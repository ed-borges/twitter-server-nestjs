import { UserDto } from '../dto/user.dto';
import { User } from '../user.entity';

export const toUserDto = (data: User): UserDto => {
  const { id, username, email } = data;
  const userDto: UserDto = { id, username, email };
  return userDto;
};

export const toUser = (data: User): UserDto => {
  const { id, username, email } = data;
  const userdto: UserDto = { id, username, email };
  return userdto;
};
