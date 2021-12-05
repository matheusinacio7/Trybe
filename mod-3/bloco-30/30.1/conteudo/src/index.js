const express = require('express');

const authorRouter = require('./routers/author');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/author', authorRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});