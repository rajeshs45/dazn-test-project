import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoleEnum } from 'src/enums/role.enum';
import { StatusEnum } from 'src/enums/status.enum';
import { BaseEntity } from './base.entity';
import mongoose from 'mongoose';

export type AuthEntity = Auth & Document;

@Schema({ collection: 'auths', timestamps: true })
export class Auth extends BaseEntity {
  @Prop({ index: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, enum: [RoleEnum.admin, RoleEnum.consumer] })
  role: string;

  @Prop({
    default: StatusEnum.notVerified,
    enum: [StatusEnum.active, StatusEnum.notVerified, StatusEnum.inActive],
  })
  status: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
