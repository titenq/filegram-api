import mongoose from '@/db';

const FileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  telegramPath: {
    type: String,
    required: true
  },
  telegramMessageId: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'files' });

const FileModel = mongoose.model('File', FileSchema);

export default FileModel;
