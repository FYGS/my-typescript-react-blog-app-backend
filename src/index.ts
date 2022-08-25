import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request: Request, response: Response) => {
  response.send('Hello From Node using TypeScript');
});


app.listen(PORT, () => {
  console.log(`Server Up and Running on ${PORT} ⚡`);
});
