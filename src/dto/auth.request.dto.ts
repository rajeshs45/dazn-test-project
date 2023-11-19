import mongoose from 'mongoose';
import { RoleEnum } from 'src/enums/role.enum';

export class AuthRequestDto {
  username: string;
  password: string;
  role: [RoleEnum.admin, RoleEnum.consumer];
  userId: mongoose.Schema.Types.ObjectId;
}
