const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');
app.use(express.json());
app.use(morgan('dev'));

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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!' 
  })
}

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  })
}


// ROUTER MOUNTING
const tourRouter = express.Router();
const userRouter = express.Router();

// TOURS ROUTES
tourRouter
  .route('/')
  .get(getTours)
  .post(createTour)
tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)

// USER ROUTES
userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser)
userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


// LISTENING TO THE PORT
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})