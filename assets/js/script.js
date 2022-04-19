var buttonEl = document.querySelector('#save-task');
var taskToDoEl = document.querySelector('#tasks-to-do');
var formEl = document.querySelector('#task-form');

var taskHandler = function(event) {
    console.log(event);

    // prevents the browser from refreshing once we hit the submit button. Otherwise code will run and browser refresh at same time.
    event.preventDefault();

    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    listItemEl.textContent = 'This is a new task';
    taskToDoEl.appendChild(listItemEl);
};

formEl.addEventListener('submit', taskHandler);