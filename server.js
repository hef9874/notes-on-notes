const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util')
const notes = require('./db/db.json');

const uuid = require('./lib/uuid');

const PORT = process.env.PORT  || 3001;

const app = express();

//ask express to create route for every file in the public folder and give it a route
//sets up express app to handle data parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes',(req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
);

const readAndAppend = (content, file) => {
    console.log (content, file);
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

//route to get the tips 
app.get('/api/notes')

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}.`);
});
