import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import apiRoutes from './api/routes.js';
dotenv.config();

console.log("Environment is :", process.env.NODE_ENV);
console.log("Env variable:", process.env.NODE_ENV);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use('/api', apiRoutes);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const PORT = 3003; // Use port 3003 for API only

app.listen(PORT, () => {
  console.log(`API Server running at http://localhost:${PORT}`);
});