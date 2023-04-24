const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'http://localhost';
const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URL = process.env.MONGODB_URL;

module.exports = { PORT, HOST, MONGODB_URL, JWT_SECRET };