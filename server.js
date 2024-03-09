const app = require('./app');

// LISTENING TO THE PORT
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});