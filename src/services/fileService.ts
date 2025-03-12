import fs from 'node:fs';
import path from 'node:path';

import axios from 'axios';
import { Bot, InputFile } from 'grammy';

import FileModel from '@/models/FileModel';
import {
  IFileData,
  IMessageWithVideo
} from '@/interfaces/fileInterface';

const { BOT_TOKEN, CHAT_ID } = process.env;

const fileService = {
  getFile: async (fileId: string) => {
    const bot = new Bot(BOT_TOKEN!);
    const fileInfo = await bot.api.getFile(fileId);
    const downloadUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${fileInfo.file_path}`;
    const response = await axios({
      method: 'GET',
      url: downloadUrl,
      responseType: 'stream'
    });

    return response.data;
  },

  getFiles: async () => {
    const files = await FileModel.find({});

    return files;
  },

  fileUpload: async (file: IFileData) => {
    const { buffer, filename } = file;
    const bot = new Bot(BOT_TOKEN!);
    const uploadsDir = path.join(process.cwd(), 'uploads');

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    const tempPath = path.join(process.cwd(), 'uploads', filename);

    await fs.promises.writeFile(tempPath, buffer);

    const msg = await bot.api.sendDocument(
      CHAT_ID!,
      new InputFile(tempPath),
      { caption: filename }
    ) as IMessageWithVideo;

    const fileId = (msg.document?.file_id || msg.video?.file_id) as string;

    const newFile = new FileModel({
      filename,
      telegramPath: fileId,
      telegramMessageId: msg.message_id
    });

    await newFile.save();
    await fs.promises.unlink(tempPath);

    return newFile;
  },

  fileDelete: async (id: string, messageId: string) => {
    const bot = new Bot(BOT_TOKEN!);

    await Promise.all([
      bot.api.deleteMessage(CHAT_ID!, Number(messageId)),
      FileModel.findByIdAndDelete(id)
    ]);

    return true;
  },
};

export default fileService;
