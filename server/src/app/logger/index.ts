/**
 * @author: abhijit.baldawa
 */

import { createServerLogger } from '../utils/logger';

const SERVICE_NAME = 'project-management';

/**
 * Create a logger instance for this server with
 * the provided configuration
 */
const logger = createServerLogger({
  logLevel: 'debug',
  serviceName: SERVICE_NAME,
  productionMode: false,
});

export { logger };
