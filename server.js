const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (_, res, next) => {
   try {
      res.send(`Hello world!`);
   } catch (error) {
      next(error);
   }
});

app.listen(PORT, () => console.log('Node app is running on port', PORT));
