import * as Joi from 'joi';
import { UnprocessableEntityException } from '@nestjs/common';
import { joiConfig } from 'src/config';
import { AuthRequestDto } from 'src/dto/auth.request.dto';

export class AuthValidator {
  static validateAuth = (authRequestDto: AuthRequestDto) => {
    const schema = Joi.object({
      username: Joi.string().required().messages({
        'string.empty': 'username is required',
      }),
      password: Joi.string().required().messages({
        'string.empty': 'password is required',
      }),
    });

    const { error } = schema.validate(authRequestDto, joiConfig);
    if (error?.details) {
      throw new UnprocessableEntityException(error.details);
    }
  };
}
