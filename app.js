require('./console');
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const connection = require('./db/connect');

const mainRouter = require('./routes/mainRouter');

const app = express();

app.use(morgan('dev'));

app.use(fileUpload());
app.use(express.json());
app.use(express.static('./public'));
app.use('/api/v1', mainRouter);

const port = process.env.PORT || 3000;

const initFunc = () => {
  app.listen(port, console.log(`Server running on PORT: ${port}........`));
  connection(process.env.MONGO_URL);
};

initFunc();
