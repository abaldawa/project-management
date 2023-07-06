/**
 * @author: abhijit.baldawa
 *
 * Standard logger module using winston to create server specific logger instance
 */

import { createLogger, format, transports } from 'winston';

type TransformableInfo = Parameters<Parameters<typeof format.printf>[0]>[0];
interface ConsoleLogTransformableInfo extends TransformableInfo {
  service?: string;
  stack?: string;
  timestamp?: string;
}

type Transports = NonNullable<Parameters<typeof createLogger>[0]>['transports'];
interface LoggerOptions {
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  serviceName: string;
  productionMode: boolean;
  transports?: Transports;
}

/**
 * @public
 *
 * A factory function which creates a logger instance for the
 * server using provided configurations.
 *
 * The logger instance
 * can then be used to log `info`, `warn`, `error`, `debug` etc
 * logging information based on the provided `logLevel`
 *
 * @param options
 * @returns
 */
const createServerLogger = (options: LoggerOptions) => {
  const {
    logLevel,
    serviceName,
    transports: transportOption,
    productionMode,
  } = options;

  const logger = createLogger({
    level: logLevel,
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      format.errors({ stack: false }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: serviceName },
    transports: transportOption,
  });

  if (!productionMode) {
    /**
     * If its not production mode then use console as a transport
     * mechanism i.e. logs to the console
     */
    logger.add(
      new transports.Console({
        level: logLevel,
        format: format.combine(
          format.printf((logObj: ConsoleLogTransformableInfo) => {
            const {
              level,
              message,
              timestamp,
              stack,
              service,
              ...additionalLog
            } = logObj;

            return `(${timestamp}) ${service}: (${level}) ${message}${
              Object.keys(additionalLog).length
                ? `, additionalLogs = ${JSON.stringify(additionalLog, null, 2)}`
                : ''
            }${stack ? `, stack = ${stack}` : ''}`;
          }),
          format.colorize({ all: true })
        ),
      })
    );
  }

  return logger;
};

export { createServerLogger };
