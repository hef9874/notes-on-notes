const express = require('express');
const app = express();
const api = require('./routes/routes');
const path = require('path');
const html = require('./routes/html')

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);
app.use('/', html);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));