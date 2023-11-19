import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from './base.entity';
import mongoose from 'mongoose';

export type MoviesEntity = Movies & Document;

@Schema({ collection: 'movies', timestamps: true })
export class Movies extends BaseEntity {
  @Prop()
  title: string;

  @Prop({ index: true })
  genre: string;

  @Prop()
  rating: number;

  @Prop()
  link: string;

  @Prop({ default: null })
  addedBy: mongoose.Schema.Types.ObjectId;

  @Prop({ default: null })
  updatedBy: mongoose.Schema.Types.ObjectId;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
