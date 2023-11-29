import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouters } from './app/modules/users/user.route';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRouters);

app.get('/', (req: Request, res: Response) => {
  
  res.send("Hello World");
  
});

export default app;
