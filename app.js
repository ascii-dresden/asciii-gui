const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rfs = require('rotating-file-stream');

const app = express();
const logDirectory = path.join(__dirname, 'log');
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
});

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(morgan('common', { skip: (req, res) => app.get('env') !== 'production', stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(notFound);
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function notFound(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
}

module.exports = app;
