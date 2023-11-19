import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MoviesRequestDto } from 'src/dto/movies.request.dto';
import { Movies, MoviesEntity } from 'src/entity/movies.entity';
import { Model } from 'mongoose';
import { RoleEnum } from 'src/enums/role.enum';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies.name)
    private _moviesDb: Model<MoviesEntity>,
  ) {}

  async addMoviesService(requestDto: MoviesRequestDto, request) {
    if (request.user.role !== RoleEnum.admin) {
      throw new BadRequestException(
        'User is Not Authorized to Perform this Operation',
      );
    }
    const user = request.user.userId;
    const addMovie = { ...requestDto, addedBy: user };
    const newMovie = new this._moviesDb(addMovie);
    return await newMovie.save();
  }

  async getByTitleOrGenreService(searchItem) {
    const findMovie = await this._moviesDb.findOne({
      $or: [{ title: searchItem.trim() }, { genre: searchItem.trim() }],
    });
    if (!findMovie) {
      return 'No Movies Found with the search Keyword';
    }
    return findMovie;
  }

  async getAllMoviesService() {
    const moviesList = await this._moviesDb.find();
    return moviesList;
  }

  async updateMoviesService(request, updates) {
    if (request.user.role !== RoleEnum.admin) {
      throw new BadRequestException(
        'User is Not Authorized to Perform this Operation',
      );
    }
    const _id = request.user.userId;
    const findMovie = await this._moviesDb.updateOne(
      { _id: updates.id },
      {
        $set: {
          title: updates.title,
          genre: updates.genre,
          rating: updates.rating,
          link: updates.link,
          updatedBy: _id,
        },
      },
    );

    return findMovie;
  }

  async deleteMovieService(_id, request) {
    if (request.user.role !== RoleEnum.admin) {
      throw new BadRequestException(
        'User is Not Authorized to Perform this Operation',
      );
    }
    return await this._moviesDb.deleteOne({ _id });
  }
}
