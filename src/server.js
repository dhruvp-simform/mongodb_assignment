require('dotenv').config();

const express = require('express');
const { PORT, HOST } = require('./utils/env');
const AppController = require('./controllers/app.controller');
const ErrorInterceptor = require('./interceptors/error.interceptor');
const MongodbService = require('./services/mongodb.service');

async function bootstrap() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', AppController);
    app.use(ErrorInterceptor);

    await MongodbService();
    app.listen(PORT, () => {
        console.log(`Server is running on ${HOST}:${PORT}`);
    });
}

bootstrap();