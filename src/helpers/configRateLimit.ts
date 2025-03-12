import { FastifyInstance } from 'fastify';
import rateLimit from '@fastify/rate-limit';

const configRateLimit = async (app: FastifyInstance) => {
  await app.register(rateLimit, {
    max: 300,
    timeWindow: '1 minute',
    ban: 3,
    allowList: ['127.0.0.1'],
    errorResponseBuilder: function (request, context) {
      const errorMessage = context.ban
        ? 'IP banido temporariamente devido a múltiplas violações'
        : 'Muitas requisições, tente novamente mais tarde';

      return { error: errorMessage };
    }
  });
};

export default configRateLimit;
