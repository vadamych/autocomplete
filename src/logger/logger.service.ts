import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { LoggerService } from '@nestjs/common';

@Injectable()
export class LoggerServiceImplementation implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          return `[${level.toUpperCase()}] [${timestamp}] ${message} ${
            stack ? `\n${stack}` : ''
          }`;
        }),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({
              all: true,
              colors: {
                info: 'green',
                error: 'red',
                warn: 'yellow',
                debug: 'magenta',
              },
            }),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({
          filename: 'logs/app.log',
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string = '') {
    if (trace) {
      this.logger.error(`${message} - Trace: ${trace}`);
    } else {
      this.logger.error(message);
    }
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
