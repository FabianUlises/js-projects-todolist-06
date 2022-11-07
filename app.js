// Selecting elements from dom
const nameInput = document.querySelector('#userName');
const newTodoBtn = document.querySelector('#add-new-todo');
const todoList = document.querySelector('#todo-list');
const todoInput = document.querySelector('#content');
const todoCategory = document.querySelector('.cat');
// Function to save new todo to local storage
const saveLocalTodos = (el) => {
    // Setting todos to localstorage data or empty array
    if(localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // Appending new todo 'el' to todos array
    todos.push(el);
    // Saving new todos to localstorage
    localStorage.setItem('todos', JSON.stringify(todos));
}
// Function to display todos
const displayTodos = () => {
    // Setting todos to localstorage data or empty array
    if(localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // Creating dom elements for each todo
    todos.forEach(todo => {
        // Creating elements and adding classes
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');
        content.classlist.add('todo-content');
        // actions.classlist.add('actions');
        // edit.classlist.add('edit');
        // deleteButton.classlist.add('delete');
        // input.type = 'checkbox';
        // input.checked = todo.done;
        // span.classlist.add('bubble');
        // if(todo.category == 'personal') {
        //     span.classList.add('personal');
        // } else {
        //     span.classList.add('business');
        // }

        content.innerHTML = `<input type='text' value='${todo.content}' readonly />`
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';
        label.appendChild(input);
        // label.appendChild(span);
        actions.appendChild(edit)
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        todoList.appendChild(todoItem);
        if(todo.done){
            todo.classlist.add('done')
        }
        input.addEventListener('click', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            if(todo.done) {
                todoItem.classlist.add('done');
            } else {
                todoItem.classList.remove('done');
            }
            displayTodos();
        });

    });
};
// Loading todos from localstorage and setting username
window.addEventListener('DOMContentLoaded', () => {
    // Setting username to localstorage data or empty string
    const username = localStorage.getItem('username') || '';
    let todos;
    // Setting todos to localstorage data or empty array
    if(localStorage.getItem('todos') == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // Shorter way of writing same statement
    // todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Setting nameinput to username
    nameInput.value = username;
    displayTodos();
});
// Eventlistener to change username with input
nameInput.addEventListener('change', (e) => {
    localStorage.setItem('username', e.target.value);
});
// Eventlistener to add new todo to list
newTodoBtn.addEventListener('click', () => {
    // New todo
    // Getting values from name attr
    const todo = {
        content: todoInput.value,
        category: todoCategory.value,
        done: false,
        createdAt: new Date().getTime()
    }
    // Saving new todo to local storage
    saveLocalTodos(todo);
    let todos = JSON.parse(localStorage.getItem('todos'))
    todos.forEach(todo => {
        // Creating elements and adding classes
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');
        content.innerHTML = `<input type='text' value='${todo.content}' readonly />`
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';
        label.appendChild(input);
        // label.appendChild(span);
        actions.appendChild(edit)
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        todoList.appendChild(todoItem);
    })
    
    // Resetting input
    e.target.reset();
});