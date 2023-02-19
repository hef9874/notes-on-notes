const express = require('express');

const app = express();

const PORT = process.env.PORT  || 3001;

const apiRoutes = require('./routes/apiRoutes')

//ask express to create route for every file in the public folder and give it a route
app.use(express.static('public'));
//sets up express app to handle data parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//to route files
