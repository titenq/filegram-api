import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { FastifyInstance } from 'fastify';

const indexRoute = async (fastify: FastifyInstance) => {
  const files = readdirSync(resolve(process.cwd(), 'src', 'routes'))
    .filter(file => file.endsWith('.ts') && file !== 'indexRoute.ts');

  for (const file of files) {
    const routeModule = await import(resolve(process.cwd(), 'src', 'routes', file));

    fastify.register(routeModule);
  }
};

export default indexRoute;
