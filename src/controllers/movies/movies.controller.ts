import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesRequestDto } from 'src/dto/movies.request.dto';
import { GlobalResponseDto } from 'src/dto/globalResponse.dto';
import { MoviesValidator } from 'src/validators/movies.validator';
import { Response } from 'express';
import { UserRequest } from 'src/middleware/verifyToken.middleware';

@Controller('movies')
export class MoviesController {
  constructor(private _moviesService: MoviesService) {}

  @Post('addMovies')
  async addMovies(
    @Body() requestDto: MoviesRequestDto,
    @Res() response: Response,
    @Req() request: UserRequest,
  ) {
    MoviesValidator.validateMovies(requestDto);
    const result = await this._moviesService.addMoviesService(
      requestDto,
      request,
    );
    return response
      .status(HttpStatus.OK)
      .json(new GlobalResponseDto(HttpStatus.OK, '', result, []));
  }

  @Get('getByTitleOrGenre/:search')
  async getByTitleOrGenre(
    @Res() response: Response,
    @Param('search') search: string,
  ) {
    const result = await this._moviesService.getByTitleOrGenreService(search);
    return response
      .status(HttpStatus.OK)
      .json(new GlobalResponseDto(HttpStatus.OK, '', result, []));
  }

  @Get('getAllMovies')
  async getAllMovies(@Res() response: Response) {
    const result = await this._moviesService.getAllMoviesService();
    return response
      .status(HttpStatus.OK)
      .json(new GlobalResponseDto(HttpStatus.OK, '', result, []));
  }

  @Put('updateMovies')
  async updateMovies(
    @Res() response: Response,
    @Body() requestDto: MoviesRequestDto,
    @Req() request: UserRequest,
  ) {
    const result = await this._moviesService.updateMoviesService(
      request,
      requestDto,
    );
    return response
      .status(HttpStatus.OK)
      .json(new GlobalResponseDto(HttpStatus.OK, '', result, []));
  }

  @Delete('deleteMovie/:id')
  async deleteMovie(
    @Res() response: Response,
    @Req() request: UserRequest,
    @Param('id') id: string,
  ) {
    const result = await this._moviesService.deleteMovieService(id, request);
    return response
      .status(HttpStatus.OK)
      .json(new GlobalResponseDto(HttpStatus.OK, '', result, []));
  }
}
