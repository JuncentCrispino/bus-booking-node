import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import environment from './config/environment';
import { stream } from './utils/logger';

const app = express();

app.use(morgan(environment.logFormat, { stream }));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
app.options('*', cors());