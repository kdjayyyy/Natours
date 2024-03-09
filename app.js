const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');


// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


// MOUNTING THE ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);


// LISTENING TO THE PORT
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})