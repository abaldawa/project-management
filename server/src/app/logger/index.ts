/**
 * @author: abhijit.baldawa
 */

import { createServerLogger } from '../utils/logger';

const SERVICE_NAME = 'project-management';

const logger = createServerLogger({
  logLevel: 'debug',
  serviceName: SERVICE_NAME,
  productionMode: false,
});

export { logger };
