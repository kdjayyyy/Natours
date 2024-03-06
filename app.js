// express 4 package
const express = require('express');
const app = express();

// res.send to send the string data 

// GET request is the result we get from the HTTP request
app.get('/', (req, res) => {
    res.status(200).json(
        {
            message: 'Hello from the server side',
            app: 'natours'
        }
    );
});


// POST request is what we send to the browser
app.post('/', (req, res) => {
    res.send('You can post to this endpoint...');
});


const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});