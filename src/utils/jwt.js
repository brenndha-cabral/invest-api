require('dotenv').config();
const jwt = require('jsonwebtoken');
const { HttpException } = require('./httpException');
const { statusCode } = require('./httpStatus');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '6h',
  algorithm: 'HS256',
};

const generateToken = ({ id, name, adm }) => {
  try {
    return jwt.sign({ id, name, adm }, JWT_SECRET, jwtConfig);
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, 'Could not generate token. Please, try again.');
  }
};

const authToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return false;
  }
};

module.exports = {
  generateToken,
  authToken,
};
