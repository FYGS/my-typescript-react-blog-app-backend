import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { articlesInfo } from './data';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/articles/:name/upvote', (request: Request, response: Response) => {
  const { name } = request.params;
  const article = articlesInfo[name];

  if (article !== undefined) {
    article.upvotes += 1;
    return response.status(200).send(`${name} now has ${article.upvotes} upvotes`);
  }

  return response.status(404).send('Article not found');
});

app.post('/api/articles/:name/add-comment', (request: Request, response: Response) => {
  const { name } = request.params;
  const article = articlesInfo[name];
  const { username, text } = request.body;

  if (article !== undefined) {
    article.comments.push({ username, text });
    return response.status(200).send(article);
  }

  return response.status(404).send('Article not found');
});

app.listen(PORT, () => {
  console.log(`Server Up and Running on ${PORT} ⚡`);
});
