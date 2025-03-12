import { FastifyReply, FastifyRequest } from 'fastify';

import fileService from '@/services/fileService';
import {
  IFile,
  IFileData,
  IFileUpload
} from '@/interfaces/fileInterface';
import siteOrigin from '@/helpers/siteOrigin';

export const getFilesController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const response: IFile[] = await fileService.getFiles();

    return reply.send(response);
  } catch (error) {
    return reply.status(400).send(error);
  }
};

export const getFileController = async (
  request: FastifyRequest<{ Params: { fileId: string } }>,
  reply: FastifyReply
) => {
  try {
    const { fileId } = request.params;
    const response = await fileService.getFile(fileId);

    reply.headers({
      'Access-Control-Allow-Origin': siteOrigin,
      'Content-Type': response.headers['content-type']
    });

    return reply.send(response);
  } catch (error) {
    return reply.status(400).send(error);
  }
};

export const fileUploadController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const body = request.body as Record<string, IFileUpload>;
    const fileData = body.file;

    if (!fileData?.toBuffer) {
      return reply.status(400).send({ error: 'Nenhum arquivo recebido' });
    }

    const fileDataUpload: IFileData = {
      filename: fileData.filename,
      mimetype: fileData.mimetype,
      buffer: await fileData.toBuffer(),
      encoding: fileData.encoding
    };

    const response: IFile = await fileService.fileUpload(fileDataUpload);

    return reply.send(response);
  } catch (error) {
    return reply.status(400).send(error);
  }
};

export const fileDeleteController = async (
  request: FastifyRequest<{ Params: { id: string, messageId: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id, messageId } = request.params;
    const response = await fileService.fileDelete(id, messageId);

    return reply.send(response);
  } catch (error) {
    return reply.status(400).send(error);
  }
};
