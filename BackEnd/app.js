const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const apiRoutes = require('./src/modules/routes/routes');

const url = "mongodb+srv://new_user:restart987@cluster0.aa65y.mongodb.net/DataBase?retryWrites=true&w=majority";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

app.use(cors());
app.use(bodyParser.json());
app.use('/', apiRoutes);

app.listen(8080, () => {
  console.log('Server is working');
});