const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const crypto = require('crypto');
const todos = [{todo: 'text', id: generateUuid()}];

function generateUuid() {
    return crypto.randomUUID();
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/todos', (req, res) => {
    res.json({todos});
});

app.post('/todos', (req, res) => {
    const todo = req.body.todo.trim();
    if (todo) {
        todos.push({todo, id: generateUuid()});
    }
    res.json(req.body);
});

app.listen(port, () => console.info(`App listening on port ${port}`));
