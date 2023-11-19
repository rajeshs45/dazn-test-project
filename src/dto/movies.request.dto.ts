import mongoose from 'mongoose';

export class MoviesRequestDto {
  id: mongoose.Schema.Types.ObjectId;
  title: string;
  genre: string;
  rating: number;
  link: string;
  addedBy: mongoose.Schema.Types.ObjectId;
  updatedBy: mongoose.Schema.Types.ObjectId;
}
