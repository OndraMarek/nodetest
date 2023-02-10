const todoAdd = document.getElementById('addButton');

function renderTodo(index, todoItem) {
    const todoText = getTodoText(todoItem);
    const line = addLineOnTodoList(todoText);
    addDeleteButtonToLine(line, todoItem.id);
}

function addLineOnTodoList(todoText) {
    const line = createNewLine(todoText);
    getTodoList().appendChild(line);

    return line;
}

function getTodoList() {
    return document.getElementById('todoUl');
}

function createNewLine(todoText) {
    const todo = createTodo(todoText);
    const line = document.createElement('li');
    line.appendChild(todo);

    return line;
}

function createTodo(todoText) {
    const p = document.createElement('p');
    p.appendChild(todoText);

    return p;
}

function getTodoText(todoItem) {
    return document.createTextNode(todoItem.todo);
}

function addDeleteButtonToLine(line, todoId) {
    line.appendChild(renderDeleteButton(todoId));
}

function renderDeleteButton(todoId) {
    let deleteButton = document.createElement('a');
    let deleteText = document.createTextNode('Delete');
    deleteButton.className = 'deleteButton btn btn-danger';
    deleteButton.appendChild(deleteText);
    $(deleteButton).click(() => {
        //deleteTodo(todoId);
        console.log(todoId);
    });

    return deleteButton;
}

/*let todoDelete = document.getElementsByClassName('deleteButton');
for (let i = 0; i < todoDelete.length; i++) {
    todoDelete[i].addEventListener('click', deleteTask);
    function deleteTask() {
        this.parentElement.remove();
    }
}*/

function renderTodos() {
    $.ajax({
        url: '/todos',
        type: 'get',
        dataType: 'json',
        success: response => {
            $.each(response.todos, renderTodo);
        },
    });
}

function addNewTodo(event) {
    event.preventDefault();
    const actionUrl = event.currentTarget.action;
    const todo = $('#todoInput').val();
    const id = crypto.randomUUID();
    const todoItem = {todo, id};
    if (todo) {
        renderTodo(0, todoItem);
    }
    $.ajax({
        url: actionUrl,
        type: 'post',
        data: todoItem,
        dataType: 'json',
        success: resetTodoInput,
    });

    return false;
}

function resetTodoInput() {
    $('#todoInput').val('');
}

function addNewTaskOnSubmit() {
    $('#frmMain').on('submit', addNewTodo);
}
