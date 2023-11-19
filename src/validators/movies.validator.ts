import * as Joi from 'joi';
import { UnprocessableEntityException } from '@nestjs/common';
import { joiConfig } from 'src/config';
import { MoviesRequestDto } from 'src/dto/movies.request.dto';

export class MoviesValidator {
  static validateMovies = (moviesRequestDto: MoviesRequestDto) => {
    const schema = Joi.object({
      title: Joi.string().required().messages({
        'string.empty': 'title is required',
      }),
      genre: Joi.string().required().messages({
        'string.empty': 'genre is required',
      }),
      rating: Joi.number().required().messages({
        'number.empty': 'rating is required',
      }),
      link: Joi.string().required().messages({
        'string.empty': 'link is required',
      }),
    });

    const { error } = schema.validate(moviesRequestDto, joiConfig);
    if (error?.details) {
      throw new UnprocessableEntityException(error.details);
    }
  };
}
