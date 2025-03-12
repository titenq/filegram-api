import mongoose from 'mongoose';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_APP_NAME } = process.env;

const connectionString = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/filegram?retryWrites=true&w=majority&appName=${DB_APP_NAME}`;

mongoose.set('strictQuery', true);

mongoose.connect(connectionString, { autoIndex: true })
  .then(() => {
    mongoose.connection.useDb('filegram');
  });

mongoose.Promise = global.Promise;

export default mongoose;
