import winston from 'winston';
import expressWinston from 'express-winston';

// create the custom formatter
const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
      `${timestamp} ${level}: ${meta.error?.stack || message}`
  )
);

// create a request logger
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log', format: winston.format.json() }),
  ],
  format: messageFormat,
});

// error logger
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log', format: winston.format.json() }),
  ],
  format: messageFormat,
});

export {
  requestLogger,
  errorLogger,
};