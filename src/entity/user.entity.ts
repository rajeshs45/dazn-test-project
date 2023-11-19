import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';

export type UserEntity = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User extends BaseEntity {
  @Prop({ default: '' })
  firstName: string;

  @Prop({ default: '' })
  lastName: string;

  @Prop({ default: '' })
  gender: string;

  @Prop({ default: '' })
  email: string;

  @Prop({ default: '' })
  phoneNumber: string;

  @Prop({ type: Object, default: {} })
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
  };
}
export const UserSchema = SchemaFactory.createForClass(User);
