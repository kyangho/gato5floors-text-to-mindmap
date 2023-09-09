import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ProductRoute from './routes/ProductRoute.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export default app;
