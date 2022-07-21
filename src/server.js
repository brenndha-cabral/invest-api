const express = require('express');
require('dotenv').config();
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json');
const routes = require('./routes');
// const { errorMiddleware } = require('./middleware/errorMiddleware');

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', routes);

// app.use(errorMiddleware);

app.listen(PORT, () => console.log('Listening at', PORT));
