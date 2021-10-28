import { IsEmail, IsNotEmpty } from 'class-validator';

// export class AddDTO {
//   @IsNotEmpty() username: string;
//   @IsNotEmpty() @IsEmail() email: string;
//   @IsNotEmpty() password: string;
//   criacao_at = Date.now();
// }

export class CreateUserDto {
  @IsNotEmpty() username: string;
  @IsNotEmpty() password: string;
  @IsNotEmpty() @IsEmail() email: string;
}

export class UserDto {
  @IsNotEmpty() id: number;
  @IsNotEmpty() username: string;
  @IsNotEmpty() @IsEmail() email: string;
}
