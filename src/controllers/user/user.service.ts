import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserEntity } from 'src/entity/user.entity';
import { Model } from 'mongoose';
import { AddUserRequestDto } from 'src/dto/user.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private _userDb: Model<UserEntity>,
  ) {}

  async addUserService(request: AddUserRequestDto) {
    const newUser = new this._userDb(request);
    return await newUser.save();
  }
}
