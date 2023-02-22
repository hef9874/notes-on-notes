const express = require('express');

const app = express();

const PORT = process.env.PORT  || 3001;

const apiRoutes = require('../Develop/routes/apiRoutes/index')
const htmlRoutes = require('../Develop/routes/apiRoutes/htmlRoutes/index')



//ask express to create route for every file in the public folder and give it a route
app.use(express.static('public'));
//sets up express app to handle data parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API now on ${PORT}.`);
});
