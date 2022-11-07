// Selecting elements from dom
const nameInput = document.querySelector('#userName');
const newTodo = document.querySelector('#new-todo-form');
const todoList = document.querySelector('#todo-list');
const todoInput = document.querySelector('#content');
const todoCategory = document.querySelector('.cat');
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
        console.log(todo)
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
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
        if(todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.innerHTML = `<input type='text' value='${todo.content}' readonly dataset-todo-value/>`
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit)
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        todoList.appendChild(todoItem);
        edit.addEventListener('click', () => {
            const userInput = document.querySelector('[dataset-todo-value]');
            userInput.removeAttribute('readonly');
            userInput.focus();
            userInput.addEventListener('blur', (e) => {        
                userInput.setAttribute('readonly', true);
                console.log(e.target.value);
                localStorage.setItem('todos', JSON.stringify(todos))
            });
        });
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            displayTodos();
        })
        if(todo.done){
            todoItem.classList.add('done')
        }
        input.addEventListener('click', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));
            if(todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }
        });

    });
};
// Loading todos from localstorage and setting username
window.addEventListener('DOMContentLoaded', () => {
    const deleteBtn = document.querySelector('.delete')
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
newTodo.addEventListener('submit', (e) => {
    e.preventDefault();
    // New todo
    // Getting values from name attr
    const todo = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false,
        createdAt: new Date().getTime()
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
    // Saving new todo to local storage
    // saveLocalTodos(todo);
    // let todos = JSON.parse(localStorage.getItem('todos'))
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
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
        if(todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit)
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        todoList.appendChild(todoItem);
    })
    e.target.reset();
});
