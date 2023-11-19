import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { MoviesController } from './movies/movies.controller';
import { AuthController } from './auth/auth.controller';
import { MoviesService } from './movies/movies.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from 'src/entity/auth.entity';
import { Movies, MoviesSchema } from 'src/entity/movies.entity';
import { User, UserSchema } from 'src/entity/user.entity';
import { VerifyTokenMiddleware } from 'src/middleware/verifyToken.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: Movies.name, schema: MoviesSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserController, MoviesController, AuthController],
  providers: [UserService, MoviesService, AuthService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes('/');
  }
}
