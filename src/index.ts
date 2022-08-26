import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';

import { ArticlesService, performDBOperation } from './data';
import path from 'path';

dotenv.config();

const STATIC_FOLDER = '/frontend';
const INDEX_FILE_PATH = `${STATIC_FOLDER}/index.html`;

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.use(express.static(path.join(__dirname, STATIC_FOLDER)));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/articles/:name', async (request: Request, response: Response) => {
  await performDBOperation(request, response, ArticlesService.findByName);
});

app.post('/api/articles/:name/upvote', async (request: Request, response: Response) => {
  await performDBOperation(request, response, ArticlesService.upvote);
});

app.post('/api/articles/:name/add-comment', async (request: Request, response: Response) => {
  await performDBOperation(request, response, ArticlesService.addComment);
});

app.get('*', (request: Request, response: Response) => {
  console.log("🚀 ~ file: index.ts ~ line 37 ~ app.get ~ path.join(__dirname, INDEX_FILE_PATH)", path.join(__dirname, INDEX_FILE_PATH))
  response.sendFile(path.join(__dirname, INDEX_FILE_PATH));
});

app.listen(PORT, () => {
  console.log(`Server Up and Running on ${PORT} ⚡`);
});
