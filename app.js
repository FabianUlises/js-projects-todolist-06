// Selecting elements from dom
const nameInput = document.querySelector('#userName');
const newTodoForm = document.querySelector('#new-todo-form');



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
newTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('form submitted');
});