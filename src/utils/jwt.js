require('dotenv').config();
const jwt = require('jsonwebtoken');
const { HttpException } = require('./httpException');
const { statusCode, statusResponse } = require('./httpStatus');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '6h',
  algorithm: 'HS256',
};

const generateToken = ({ id, name, adm }) => {
  try {
    return jwt.sign({ id, name, adm }, SECRET, jwtConfig);
  } catch (error) {
    throw new HttpException(statusCode.INTERNAL_SERVER_ERROR, statusResponse.INTERNAL_SERVER_ERROR);
  }
};

const authToken = async (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    throw new HttpException(statusCode.UNAUTHORIZED, 'Invalid token');
  }
};

module.exports = {
  generateToken,
  authToken,
};
