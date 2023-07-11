/**
 * @author: abhijit.baldawa
 *
 * This module initializes all the pre-requisites and then starts the HTTP server
 */

import http from 'node:http';
import path from 'node:path';
import express from 'express';
import { ApolloServer, BaseContext } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { readFileSync } from 'node:fs';
import { logger } from './app/logger';
import { getPort } from './app/config/env';
import { resolverMap } from './app/graphql/resolver-map';

const SERVICE_ROOT_PATH = '/project-management-service';

/**
 * @public
 *
 * Async method which does all the standard server startup routine.
 */
const start = async (): Promise<void> => {
  try {
    const graphqlSchemaPath = path.join(
      __dirname,
      '..',
      'src',
      'app',
      'graphql',
      'schema.graphql'
    );
    const graphqlSchema = readFileSync(graphqlSchemaPath, {
      encoding: 'utf-8',
    });
    const PORT = getPort();
    const app = express();
    const httpServer = http.createServer(app);

    // 1. Initialize GraphQL server
    const server = new ApolloServer<BaseContext>({
      typeDefs: graphqlSchema,
      resolvers: resolverMap,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();

    // 2. Add express middlewares
    /**
     * Serve production build of client.
     */
    app.use(
      express.static(path.join(__dirname, '..', '..', 'client', 'build'))
    );
    app.use(express.json());
    app.use(`${SERVICE_ROOT_PATH}/graphql`, expressMiddleware(server));

    // 3. Start HTTP server
    await new Promise<void>((resolve, reject) => {
      httpServer.listen(PORT, resolve).on('error', reject);
    });

    logger.info(`Server is listening on port ${PORT}`);
  } catch (error: unknown) {
    logger.error(
      `Error while starting server. Error: ${
        (error as Error).stack
      }. Exiting...`
    );
    process.exit(1);
  }
};

if (require.main === module) {
  start();
}

export { start };
