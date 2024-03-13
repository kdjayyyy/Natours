// THE DOTENV CONFIGURATION SHOULD BE DONE BEFORE IMPORTING THE APP 
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env' 
});
const app = require('./app');


// LISTENING TO THE PORT
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});