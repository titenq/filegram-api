import 'dotenv/config';
import fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import fastifyCors from '@fastify/cors';

import apiBaseUrl from '@/helpers/apiBaseUrl';
import indexRoute from '@/routes/indexRoute';
import siteOrigin from '@/helpers/siteOrigin';
import configRateLimit from '@/helpers/configRateLimit';

const { PORT } = process.env;

const app = fastify();

app.register(fastifyCors, {
  origin: [siteOrigin],
  methods: ['GET', 'POST', 'DELETE']
});

app.register(fastifyMultipart, {
  attachFieldsToBody: true,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
    files: 1
  }
});

const startServer = async () => {
  await configRateLimit(app);
  await indexRoute(app);

  await app.listen({
    port: Number(PORT) || 3001,
    host: '0.0.0.0'
  });
};

try {
  startServer();

  console.log(`Server started in ${apiBaseUrl}`);
} catch (error) {
  console.error(error);
}

const listeners = ['SIGINT', 'SIGTERM'];

listeners.forEach(signal => {
  process.on(signal, async () => {
    await app.close();

    process.exit(0);
  });
});
