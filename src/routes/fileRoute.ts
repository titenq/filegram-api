import { FastifyInstance } from 'fastify';

import {
  fileDeleteController,
  fileUploadController,
  getFileController,
  getFilesController
} from '@/controllers/fileController';
import authHandler from '@/handlers/authHandler';

const fileRoute = async (fastify: FastifyInstance) => {
  fastify.post(
    '/files/upload',
    { preHandler: authHandler },
    fileUploadController
  );

  fastify.get(
    '/files',
    { preHandler: authHandler },
    getFilesController
  );

  fastify.get<{ Params: { fileId: string } }>(
    '/files/:fileId/download',
    { preHandler: authHandler },
    getFileController
  );

  fastify.delete<{ Params: { id: string; messageId: string } }>(
    '/files/:id/:messageId',
    { preHandler: authHandler },
    fileDeleteController
  );
};

export default fileRoute;
