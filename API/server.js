require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, process.env.MONGO_OPTIONS)
  .then(() => {
    app.listen(port, () => {
      console.log(`DB connected on port ${port}`);
    });
  })
  .catch(err => {console.error('Erreur de connexion à MongoDB :', err);});

app.get('/', (req, res) => {
  res.send('Hello World!');
});