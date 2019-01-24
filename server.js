import express from 'express';

const app = express();

app.get('/', (_, res, next) => {
   try {
      res.send(`Hello world!`);
   } catch (error) {
      next(error);
   }
});
