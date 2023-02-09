const todoAdd = document.getElementById('addButton');
todoAdd.addEventListener('click', onClick);

function onClick() {
    const inputValue = $('#todoInput').val();

    if (inputValue) {
        renderTodo(0, {todo: inputValue});
    }
}

function renderTodo(index, todoItem) {
    const todoText = getTodoText(todoItem);
    const line = addLineOnTodoList(todoText);
    addDeleteButtonToLine(line);
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

function addDeleteButtonToLine(line) {
    line.appendChild(renderDeleteButton());
}

function renderDeleteButton() {
    let deleteButton = document.createElement('a');
    let deleteText = document.createTextNode('Delete');
    deleteButton.className = 'deleteButton btn btn-danger';
    deleteButton.appendChild(deleteText);

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

    const form = $('#frmMain');
    const formData = form.serialize();
    const actionUrl = event.currentTarget.action;

    $.ajax({
        url: actionUrl,
        type: 'post',
        data: formData,
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

// function deleteTaskOnClick() {
//     $('.deleteButton').click(() => {});
// }
