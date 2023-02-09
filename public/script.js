const todoAdd = document.getElementById('addButton');
todoAdd.addEventListener('click', onClick);

function onClick() {
    const inputValue = $('#todoInput').val();
    if (inputValue) {
        addTask(inputValue);
    }
}

function addTask(todo) {
    let li = document.createElement('li');
    let p = document.createElement('p');

    let textValue = document.createTextNode(todo);
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
