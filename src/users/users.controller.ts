import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async register(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    let status: any = {
      success: true,
      message: 'user registered',
    };
    try {
      console.log(CreateUserDto);
      const result = await this.usersService.add(CreateUserDto);
      status = {
        success: true,
        content: result,
      };
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  @Get()
  async findAll(): Promise<any> {
    const result = await this.usersService.findAll();
    return result;
  }
}
