import { FastifyInstance } from 'fastify';

import {
  fileDeleteController,
  fileUploadController,
  getFileController,
  getFilesController
} from '@/controllers/fileController';

const fileRoute = async (fastify: FastifyInstance) => {
  fastify.post('/files/upload', fileUploadController);

  fastify.get('/files', getFilesController);

  fastify.get('/files/:fileId/download', getFileController);

  fastify.delete('/files/:id/:messageId', fileDeleteController);
};

export default fileRoute;
