import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AddUserRequestDto } from 'src/dto/user.request.dto';
import { Response } from 'express';
import { GlobalResponseDto } from 'src/dto/globalResponse.dto';
import { UserValidator } from 'src/validators/user.validator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private _userService: UserService) {}

  @Post('adduser')
  async adduser(
    @Body() requestDto: AddUserRequestDto,
    @Res() response: Response,
  ) {
    UserValidator.validateUser(requestDto);
    const result = await this._userService.addUserService(requestDto);
    return response
      .status(HttpStatus.OK)
      .json(new GlobalResponseDto(HttpStatus.OK, '', result, []));
  }
}
