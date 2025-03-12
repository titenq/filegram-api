import { FastifyReply, FastifyRequest } from 'fastify';

const authHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return reply.status(401).send({ message: 'Não autorizado' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');

  if (!username || !password || username !== process.env.USERNAME || password !== process.env.PASSWORD) {
    return reply.status(401).send({ message: 'Credenciais inválidas' });
  }

  return true;
};

export default authHandler;
