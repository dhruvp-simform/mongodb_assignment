const mongoose = require('mongoose');
const { MONGODB_URL } = require('../utils/env');

async function connectDatabase() {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('Database connected');
    } catch (err) {
        console.log('Database Connection Error');
        console.error(err);
    }
}

module.exports = connectDatabase;
