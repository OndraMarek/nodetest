const todoAdd = document.getElementById('addButton');
todoAdd.addEventListener('click', onClick);

function onClick() {
    const inputValue = $('#todoInput').val();
    if (inputValue) {
        renderTask(0, {todo: inputValue});
    }
}

function renderTask(index, todoItem) {
    let li = document.createElement('li');
    let p = document.createElement('p');

    let textValue = document.createTextNode(todoItem.todo);
    li.appendChild(p);
    p.appendChild(textValue);
    document.getElementById('todoUl').appendChild(li);

    let delButton = document.createElement('a');
    let delText = document.createTextNode('Delete');
    delButton.className = 'deleteButton btn btn-danger';
    delButton.appendChild(delText);
    li.appendChild(delButton);
}

let todoDelete = document.getElementsByClassName('deleteButton');
for (let i = 0; i < todoDelete.length; i++) {
    todoDelete[i].addEventListener('click', deleteTask);
    function deleteTask() {
        this.parentElement.remove();
    }
}

function renderTasks() {
    $.ajax({
        url: '/todos',
        type: 'get',
        dataType: 'json',
        success: response => {
            $.each(response.todos, renderTask);
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
