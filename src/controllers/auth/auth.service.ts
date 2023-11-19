import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthEntity } from 'src/entity/auth.entity';
import { AuthRequestDto } from 'src/dto/auth.request.dto';
import * as bcrypt from 'bcrypt';
import { StatusEnum } from 'src/enums/status.enum';
import * as jsonwebtoken from 'jsonwebtoken';
import { ConfigService } from 'src/shared/services/config.service';
import { User, UserEntity } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private _authDb: Model<AuthEntity>,
    @InjectModel(User.name)
    private _userDb: Model<UserEntity>,
  ) {}
  saltRounds = 10;

  async addAuthService(request: AuthRequestDto) {
    const encryptPassword = bcrypt.hashSync(request.password, this.saltRounds);
    const addUser = {
      username: request.username,
      userId: request.userId,
      password: encryptPassword,
      role: request.role,
      status: StatusEnum.active,
    };
    const newUser = new this._authDb(addUser);
    return await newUser.save();
  }

  async loginService(authRequestDto: AuthRequestDto) {
    const { username, password } = authRequestDto;
    const authData = await this._authDb.findOne({ username });

    if (!authData)
      throw new BadRequestException(
        'Please enter a valid Member ID and Password',
      );
    if (authData) {
      const userDoc = await this._userDb.findOne({ _id: authData.userId });
      if (userDoc) {
        if (!bcrypt.compareSync(password, authData.password)) {
          throw new BadRequestException(
            'Please enter a valid member ID and Password',
          );
        } else {
          if (authData.status !== StatusEnum.active) {
            throw new BadRequestException(
              'Customer Is Not In A Valid State, Please Contact Your Admin',
            );
          }
          const userDetails = {
            authData,
            userDoc,
          };
          return await this.generateToken(userDetails);
        }
      } else {
        throw new BadRequestException(
          'You are not allowed to login into consumer dashboard',
        );
      }
    }
  }

  async generateToken(client) {
    const { authData, userDoc } = client;
    let fullName = userDoc.firstName;
    if (userDoc.lastName) {
      fullName = `${userDoc.firstName} ${userDoc.lastName}`;
    }
    const userObj: any = {
      authId: authData.id,
      userId: userDoc.id,
      name: fullName,
      firstName: userDoc.firstName,
      lastName: userDoc.lastName,
      email: userDoc.email,
      phoneNumber: userDoc.phoneNumber,
      role: authData.role,
    };
    const jwtSecret: string = ConfigService.getConfig().jwtSecret;
    const token = jsonwebtoken.sign({ user: userObj }, jwtSecret);
    const sendToken = {
      access_token: token,
      token_type: 'Bearer',
    };
    return sendToken;
  }
}
