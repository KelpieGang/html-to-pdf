const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');

const isDev = process.env.NODE_ENV !== 'production';
const resolve = require('path').resolve;
const setupPdfConverter = require('./pdf/pdf-converter');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

setupPdfConverter(app);

// get the intended host and port number, use localhost and port 3000 if not provided
const host = '0.0.0.0'; // Let http.Server use its default IPv6/4 host
const port = process.env.PORT || 3000;

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, host);
});
