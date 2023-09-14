const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const ProductRoute = require('./routes/ProductRoute.cjs');
const db = require('./database/db.cjs');

dotenv.config({
  path: path.resolve(
    __dirname,
    `../../.env.${process.env.NODE_ENV || 'development'}`
  )
});

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.use(cors());
app.use(express.json());
app.get('/api/ping', (req, res) => {
  res.send('pong!');
});
app.use(ProductRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
