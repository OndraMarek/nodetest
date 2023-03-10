function renderTodo(index, todoItem) {
    const line = addLineOnTodoList(todoItem);
    addDeleteButtonToLine(line, todoItem.id);
}

function addLineOnTodoList(todoItem) {
    const line = createNewLine(todoItem);
    getTodoList().appendChild(line);

    return line;
}

function getTodoList() {
    return document.getElementById('todoUl');
}

function createNewLine(todoItem) {
    const todoText = getTodoText(todoItem);
    const todo = createTodo(todoText);
    const line = document.createElement('li');
    line.id = todoItem.id;
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
        deleteTodo(todoId);
    });

    return deleteButton;
}

function deleteTodo(todoId) {
    $.ajax({
        url: '/todos/' + todoId,
        type: 'delete',
        success: deleteTodoFromList(todoId),
    });
}

function deleteTodoFromList(todoId) {
    $('#' + todoId).remove();
}

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
    const todo = $('#todo').val();
    const id = crypto.randomUUID();
    const todoItem = {todo, id};
    $('#todo').removeClass('is-invalid');
    $.ajax({
        url: actionUrl,
        type: 'post',
        data: todoItem,
        dataType: 'json',
        success: () => {
            renderTodo(0, todoItem);
            resetTodoInput();
        },
        statusCode: {
            400: function (xhr) {
                const response = JSON.parse(xhr.responseText);
                $.each(response.details.body, (index, error) => {
                    const inputId = error.context.key;
                    if (inputId) {
                        $('#' + inputId).addClass('is-invalid');
                    }
                });
            },
        },
    });

    return false;
}

function resetTodoInput() {
    $('#todo').val('');
}

function addNewTaskOnSubmit() {
    $('#frmMain').on('submit', addNewTodo);
}
