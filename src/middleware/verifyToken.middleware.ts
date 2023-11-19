import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Auth, AuthEntity } from 'src/entity/auth.entity';
import { StatusEnum } from 'src/enums/status.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GlobalResponseDto } from 'src/dto/globalResponse.dto';
import { jwtDecode } from 'jwt-decode';
import { ConfigService } from 'src/shared/services/config.service';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Auth.name)
    private _authDb: Model<AuthEntity>,
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const urls = ['auths', 'users'];
    const url = (request as any).originalUrl;
    if (url.includes(urls[0]) || url.includes(urls[1])) {
      next();
      return;
    }
    const token = request.headers['authorization'];
    const jwtTokenKey = await ConfigService.getConfig();
    if (!token) {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json(
          new GlobalResponseDto(
            HttpStatus.UNAUTHORIZED,
            'Token is required',
            null,
            [],
          ),
        );
    } else if (jwt.verify(token, jwtTokenKey.jwtSecret)) {
      const decoded: any = jwtDecode(token);
      const userId = decoded?.user.userId;
      if (!userId) {
        return response
          .status(HttpStatus.BAD_REQUEST)
          .json(
            new GlobalResponseDto(
              HttpStatus.BAD_REQUEST,
              'Mandatory headers are missing',
              null,
              [],
            ),
          );
      }
      const authId = decoded?.user.authId;
      if (authId) {
        const authData = await this._authDb.findOne({ _id: authId });
        if (!authData) {
          return response
            .status(HttpStatus.UNAUTHORIZED)
            .json(
              new GlobalResponseDto(
                HttpStatus.UNAUTHORIZED,
                'User not found',
                null,
                [],
              ),
            );
        }
        if (authData.status === StatusEnum.inActive.toString()) {
          return response
            .status(HttpStatus.UNAUTHORIZED)
            .json(
              new GlobalResponseDto(
                HttpStatus.UNAUTHORIZED,
                'Account is Inactive',
                null,
                [],
              ),
            );
        } else {
          request['user'] = {
            authId,
            userId: userId,
            role: authData.role,
          };
          next();
          return;
        }
      }

      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json(
          new GlobalResponseDto(
            HttpStatus.UNAUTHORIZED,
            'Invalid token, please login again',
            null,
            [],
          ),
        );
    } else {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json(
          new GlobalResponseDto(
            HttpStatus.UNAUTHORIZED,
            'Login expired, please login again',
            null,
            [],
          ),
        );
    }
  }
}

export interface UserRequest extends Request {
  user: {
    userId: string;
    authId: string;
    role: string;
  };
}
