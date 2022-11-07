// Selecting elements from dom
const nameInput = document.querySelector('#userName');
const newTodoForm = document.querySelector('#new-todo-form');
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
});
// Eventlistener to change username with input
nameInput.addEventListener('change', (e) => {
    localStorage.setItem('username', e.target.value);
});
// Eventlistener to add new todo to list
newTodoForm.addEventListener('submit', (e) => {
    // Preventing form page from refreshing
    e.preventDefault();
    // New todo
    // Getting values from name attr
    const todo = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false,
        createdAt: new Date().getTime()
    }
    // Saving new todo to local storage
    saveLocalTodos(todo);
    // Resetting input
    e.target.reset();
});