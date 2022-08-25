import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';

import { ArticlesService, performDBOperation } from './data';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();

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

app.listen(PORT, () => {
  console.log(`Server Up and Running on ${PORT} ⚡`);
});
