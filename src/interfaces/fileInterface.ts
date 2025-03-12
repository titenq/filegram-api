import { Message } from 'grammy/types';

export interface IFile {
  filename: string;
  telegramPath: string;
  telegramMessageId: number;
}

export interface IFileData {
  filename: string;
  mimetype: string;
  encoding: string;
  buffer: Buffer<ArrayBufferLike>;
}

export interface IFileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  toBuffer: () => Buffer<ArrayBufferLike>;
}

export interface IMessageWithVideo extends Message {
  video?: {
    file_id: string;
    file_unique_id: string;
    width: number;
    height: number;
    duration: number;
  };
}
