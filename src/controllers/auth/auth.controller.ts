import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GlobalResponseDto } from 'src/dto/globalResponse.dto';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthRequestDto } from 'src/dto/auth.request.dto';
import { AuthValidator } from 'src/validators/auth.validator';

@Controller('auths')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('addAuth')
  async addMovies(
    @Body() requestDto: AuthRequestDto,
    @Res() response: Response,
  ) {
    AuthValidator.validateAuth(requestDto);
    const result = await this._authService.addAuthService(requestDto);
    return response
      .status(HttpStatus.OK)
      .json(new GlobalResponseDto(HttpStatus.OK, '', result, []));
  }

  @Post('login')
  async login(
    @Res() response: Response,
    @Body() authRequestDto: AuthRequestDto,
  ) {
    const result = await this._authService.loginService(authRequestDto);

    return response
      .status(HttpStatus.OK)
      .json(
        new GlobalResponseDto(HttpStatus.OK, 'Login successful', result, []),
      );
  }
}
