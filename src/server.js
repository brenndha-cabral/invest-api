const express = require('express');
require('dotenv').config();
require('express-async-errors');
const routes = require('./routes/index.js');
// const errorMiddleware = require('./middleware/errorMiddleware.js');

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.use('/', routes);

// app.use(errorMiddleware); // Resolver pois está dando erro

app.listen(PORT, () => console.log('Listening at', PORT));
