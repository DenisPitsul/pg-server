const http = require('http');
const app = require('./app');
require('./models');

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || 'localhost';

const httpServer = http.createServer(app);

httpServer.listen(
  PORT,
  HOST,
  () => `Server is listening http://${HOST}:${PORT}`
);
