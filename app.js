const express = require('express');
const app = express();

// GET -> what we get from the browser
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from the other side',
    app: 'natours'
  })
});

// POST -> sent to the browser
app.post('/', (req, res) => {
  res.send('You can post on this endpoint...');
})

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})