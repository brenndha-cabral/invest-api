import express from 'express';
import 'express-async-errors';
import 'dotenv/config';
// import routes from './routes';

const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());

// app.use('/', routes);

// app.use('middleware error');

app.listen(SERVER_PORT, () => console.log('Listening at', SERVER_PORT));
