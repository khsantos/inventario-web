import cors from 'cors';
import express from 'express';
import loginRoutes from './routes/loginRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import supplierRoutes from  './routes/supplierRoutes.js';
import { runMigrations } from './database/migrations/index.js';

runMigrations();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', loginRoutes);
app.use('/', clientRoutes);
app.use('/suppliers', supplierRoutes);

app.listen(3000);