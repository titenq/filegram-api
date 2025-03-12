import { FastifyInstance } from 'fastify';

import { loginController } from '@/controllers/loginController';

const fileRoute = async (fastify: FastifyInstance) => {
  fastify.post('/login', loginController);
};

export default fileRoute;
