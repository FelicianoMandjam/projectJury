import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT,
  TOKEN: process.env.TOKEN,
  DATABASE_URI: process.env.DATABASE_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT,

  // Pour le mailer

  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_FROM: process.env.MAIL_FROM,
};
