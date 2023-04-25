require('dotenv').config();

const express = require('express');
const { PORT, HOST } = require('./utils/env');
const AppController = require('./controllers/app.controller');
const ErrorInterceptor = require('./interceptors/error.interceptor');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', AppController);
app.use(ErrorInterceptor);

app.listen(PORT, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
});