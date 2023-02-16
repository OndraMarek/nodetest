import express from 'express';
import { remove } from 'lodash-es';
import bodyParser from 'body-parser';
import { validate, ValidationError, Joi } from 'express-validation';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 8080;
const todos = [];
let test = 0;
console.log(test);
const todoValidation = {
    body: Joi.object({
        todo: Joi.string().required(),
        id: Joi.string().required(),
    }),
};
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname, '/public')));
app.get('/', function (_req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/todos', (_req, res) => {
    res.json({ todos });
});
app.post('/todos', validate(todoValidation, {}, { abortEarly: false }), (req, res) => {
    const todo = req.body.todo.trim();
    const id = req.body.id;
    if (todo) {
        todos.push({ todo, id });
    }
    res.json(req.body);
});
app.delete('/todos/:id', (req, _res) => {
    const id = req.params.id;
    remove(todos, (todo) => {
        return todo.id == id;
    });
});
app.use(function (err, _req, res, _next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }
    return res.status(500).json(err);
});
app.listen(port, () => console.info(`App listening on port ${port}`));
//# sourceMappingURL=app.js.map