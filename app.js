const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());

// MIDDLEWARES
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


// need to convert the string data to json
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// CALLBACKS FOR THE HTTP REQUESTS
const getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestTime: req.requestTime,
    result: tours.length,
    data: {
      tours
    }
  })
}

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  if(!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  })
}

const createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  // copy the req.body enumerables to the object having id: newID
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);
  // async
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => { 
    // status code 201 -> new resource is created
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  })
}

const updateTour = (req, res) => {
  if(req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<This is an updated tour...>'
    }
  })
}


app.get('/api/v1/tours', getTours);
app.post('/api/v1/tours', createTour);
app.get('/api/v1/tours/:id', getTour);
app.patch('/api/v1/tours/:id', updateTour);


// LISTENING TO THE PORT
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})