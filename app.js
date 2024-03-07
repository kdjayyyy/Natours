const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// GET -> what we get from the browser
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours
    }
  })
});

// // POST -> sent to the browser
app.post('/api/v1/tours', (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  // copy the req.body enumerables to the object having id: newID
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour
      }
    })
  })
});


const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})