import express, {Express, Request, Response, NextFunction} from 'express';
import {remove} from 'lodash-es';
import bodyParser from 'body-parser';
import {validate, ValidationError, Joi} from 'express-validation';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const app: Express = express();
const port = process.env.PORT || 8080;
const todos: Array<Todo> = [];
interface Todo {
    todo: string;
    id: string;
}

const todoValidation = {
    body: Joi.object({
        todo: Joi.string().required(),
        id: Joi.string().required(),
    }),
};

app.use(bodyParser.json());
// app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', express.static(path.join(__dirname, '/public')));

app.get('/', function (_req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/todos', (_req: Request, res: Response) => {
    res.json({todos});
});

app.post('/todos', validate(todoValidation, {}, {abortEarly: false}), (req: Request, res: Response) => {
    const todo = req.body.todo.trim();
    const id = req.body.id;
    if (todo) {
        todos.push({todo, id});
    }
    res.json(req.body);
});

app.delete('/todos/:id', (req: Request, _res: Response) => {
    const id = req.params.id;
    remove(todos, (todo: Todo) => {
        return todo.id == id;
    });
});

app.use(function (err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }

    return res.status(500).json(err);
});

app.listen(port, () => console.info(`App listening on port ${port}`));
