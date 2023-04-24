const express = require('express');
const { PORT, HOST } = require('./utils/env');
const AppController = require('./controllers/app.controller');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', AppController);

app.listen(PORT, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
});