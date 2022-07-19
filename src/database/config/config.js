import 'dotenv/config';

export default {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
  },
};
