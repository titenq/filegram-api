import { FastifyReply, FastifyRequest } from 'fastify';

import loginService from '@/services/loginService';

export const loginController = async (
  request: FastifyRequest<{ Body: { username: string; password: string } }>,
  reply: FastifyReply
) => {
  try {
    const { username, password } = request.body;
    const response = await loginService.login(username, password);

    return reply.send(response);
  } catch (error) {
    return reply.status(400).send(error);
  }
};
