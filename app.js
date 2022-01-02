require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('./middlewares/cookieParser'); 
const cors = require('./middlewares/cors'); 

const router = require('./routes/router');

mongoose.connect('mongodb://localhost:27017/mestodb', {

});

const { PORT } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(cookieParser);
app.use(cors);
app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});