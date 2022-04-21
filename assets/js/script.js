var buttonEl = document.querySelector('#save-task');
var taskToDoEl = document.querySelector('#tasks-to-do');
var formEl = document.querySelector('#task-form');

var taskFormHandler = function(event) {
    // console.log(event);
    // prevents the browser from refreshing once we hit the submit button. Otherwise code will run and browser refresh at same time.
    event.preventDefault();

    /* When we use square brackets [ ] in a selector, we're trying to select an HTML element by one of its attributes. In this case, we're selecting the <input> element on the page that has a name attribute set to a value of "task-name" */
    // We just want to get the value property out of the object. That's why we type .value
    var taskNameInput = document.querySelector('input[name="task-name"]').value;
    var taskTypeInput = document.querySelector('select[name="task-type"]').value;
    // console.log(taskTypeInput);
    // console.dir(taskNameInput);

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
// Create list item
var listItemEl = document.createElement('li');
listItemEl.className = 'task-item';

// Create div to hold task info and add to list item
var taskInfoEl = document.createElement('div');
// give it a class name
taskInfoEl.className = 'task-info';

// add HTML content to div
// make sure to not add spaces when closing tags
taskInfoEl.innerHTML = '<h3 class="task-name">' + taskDataObj.name + '</h3><span class="task-type">' + taskDataObj.type + '</span>';

// get the task name stored in taskNameInput and add it to listItemEl variable
// listItemEl.textContent = taskNameInput;
// taskToDoEl.appendChild(listItemEl);

listItemEl.appendChild(taskInfoEl);

// add entire item to list
taskToDoEl.appendChild(listItemEl);
// console.dir(listItemEl);
};

formEl.addEventListener('submit', taskFormHandler);