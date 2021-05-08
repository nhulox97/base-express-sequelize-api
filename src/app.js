const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { todos, users } = require('./routes');

// Initialize app
const app = express();

// setup public directory for static content
const publicDir = path.join(__dirname, '../public/uploads');
app.use(express.static(publicDir));

// Parsing request and response to json format
app.use(bodyParser.urlencoded({ extended: false }));

// this middleware will be executed for every request to the app
app.use(function (_, res, next) {
    res.header('Content-Type', 'application/json');
    next();
});

// Permitir cualquier origen para una request
app.use(function (_, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (_, res) => {
    return res.status(200).send({
        msg: 'Hello world',
        status_code: res.statusCode
    });
});

app.post('/', (req, res) => {
    let body = [
        { p: 1, p1: 'prop' },
        { p: 1, p1: 'prop' },
        { p: 1, p1: 'prop' }
    ];
    body = JSON.stringify(body);
    return res.status(200).send({ body });
});

// Routing section
app.use('/api', todos);
app.use('/api', users);

module.exports = app;
