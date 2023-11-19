/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
export const config = {
  ENVIRONMENT: process.env.ENVIRONMENT,
};

export const joiConfig = {
  abortEarly: false,
  allowUnknown: true,
};
