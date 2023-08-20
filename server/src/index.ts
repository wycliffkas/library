import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

const app = express();
app.use(bodyParser.json());

const port = 4000;

app.use('/', routes);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app, server };
