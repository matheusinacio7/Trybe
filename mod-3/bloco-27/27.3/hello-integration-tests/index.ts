import app from './app';
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log('Server is up on port', PORT);
});
