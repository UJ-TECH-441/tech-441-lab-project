// Import required packages
const express = require('express');
const http = require('http');
const hbs = require('hbs');

// Create Express instance
const app = express();

// Set port number (change if there is a conflicting service running on 3000)
const port = 3000;
app.set('port', port);

// Set up Express to handle JSON, URL encoding and static files
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

// Declare routers
const indexRouter = require('./routes/route-mindreader');
app.use('/', indexRouter);

// Create HTTP server and plug it with the Express instance
const server = http.createServer(app);

// Start server
server.listen(port);
server.on('listening', () => console.log(`Listening on port ${server.address().port}`));
