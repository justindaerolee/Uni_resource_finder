//backend.js mucking around with the backend stuff

// load express module and create the express object.
const express = require('express');
// set up express app
const app = express();

// initialise routes
app.use('/api', require('./routes/apis'));

// listen
app.listen(process.env.port || 4000, function() {
  console.log("listening for requests");
});
