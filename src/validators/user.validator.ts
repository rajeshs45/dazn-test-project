import * as Joi from 'joi';
import { UnprocessableEntityException } from '@nestjs/common';
import { joiConfig } from 'src/config';
import { AddUserRequestDto } from 'src/dto/user.request.dto';

export class UserValidator {
  static validateUser = (userRequestDto: AddUserRequestDto) => {
    const schema = Joi.object({
      firstName: Joi.string().required().messages({
        'string.empty': 'firstName is required',
      }),
      lastName: Joi.string().required().messages({
        'string.empty': 'lastName is required',
      }),
      gender: Joi.string().required().messages({
        'string.empty': 'gender is required',
      }),
      email: Joi.string().required().messages({
        'string.empty': 'email is required',
      }),
      phoneNumber: Joi.string().required().messages({
        'string.empty': 'phoneNumber is required',
      }),
      address: Joi.object({
        addressLine1: Joi.string().required().messages({
          'string.empty': 'addressLine1 is required',
        }),
        addressLine2: Joi.string().optional().messages({
          'string.empty': 'addressLine2 is required',
        }),
        city: Joi.string().required().messages({
          'string.empty': 'city is required',
        }),
        pincode: Joi.string().required().messages({
          'string.empty': 'pincode is required',
        }),
      })
        .required()
        .messages({
          'object.empty': 'address is required',
        }),
    });

    const { error } = schema.validate(userRequestDto, joiConfig);
    if (error?.details) {
      throw new UnprocessableEntityException(error.details);
    }
  };
}
