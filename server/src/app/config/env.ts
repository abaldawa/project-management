/**
 * @author: abhijit.baldawa
 *
 * This module exposes methods to fetch environment variables
 */

import 'dotenv/config';

interface EnvironmentVariables extends NodeJS.ProcessEnv {
  PORT?: string;
}

const envVars = process.env as EnvironmentVariables;

/**
 * @public
 *
 * Get port from environment variable or else default to 3000
 * This method returns the port number on which the server should run
 */
const getPort = (): number => (envVars.PORT ? +envVars.PORT : 3000);

export { getPort };
