var taskToDoEl = document.querySelector('#tasks-to-do');
var taskInProgressEl = document.querySelector('#tasks-in-progress');
var taskCompletedEl = document.querySelector('#tasks-completed');

var buttonEl = document.querySelector('#save-task');
var formEl = document.querySelector('#task-form');
var pageContentEl = document.querySelector('#page-content');
var taskIdCounter = 0;

var taskFormHandler = function(event) {
    // console.log(event);
    // prevents the browser from refreshing once we hit the submit button. Otherwise code will run and browser refresh at same time.
    event.preventDefault();

    /* When we use square brackets [ ] in a selector, we're trying to select an HTML element by one of its attributes. In this case, we're selecting the <input> element on the page that has a name attribute set to a value of "task-name" */
    // We just want to get the value property out of the object. That's why we type .value -> allows us to retrieve the unput data
    var taskNameInput = document.querySelector('input[name="task-name"]').value;
    var taskTypeInput = document.querySelector('select[name="task-type"]').value;
    // console.log(taskTypeInput);
    // console.dir(taskNameInput);

    // check if input values are empty strings
    // TUTOR QUESTION: WHY DOES THIS STOP OUR FUNCTION FROM RUNNING & WHY DO WE PUT RETURN FALSE
    if (!taskNameInput || !taskTypeInput) {
        alert('You need to fill out the task form!');
        return false
    }

    // reset form input fields when submitting a task
    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute('data-task-id');
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    /* This way, createTaskEl() will only get called if isEdit is false. If it's true, we'll call a new function, completeEditTask(), passing it three arguments: the name input value, type input value, and task id. */
    else {
        // package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        }; 

        createTaskEl(taskDataObj);
    }
};

var createTaskEl = function(taskDataObj) {
// Create list item
var listItemEl = document.createElement('li');
listItemEl.className = 'task-item';

// add task item as custom attribute
listItemEl.setAttribute('data-task-id', taskIdCounter);

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

var taskActionsEl = createTaskActions(taskIdCounter);
// console.log(taskActionsEl);

listItemEl.appendChild(taskActionsEl);

// add entire item to list
taskToDoEl.appendChild(listItemEl);
// console.dir(listItemEl);

// increase task counter for next unique id
taskIdCounter++;
};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    // create edit button
    var editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    editButtonEl.className = 'btn edit-btn';
    editButtonEl.setAttribute('data-task-id', taskId)
    
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.className = 'btn delete-btn';
    // data-task-id is used to identify each unique button
    deleteButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement('select');
    statusSelectEl.className = 'select-status';
    statusSelectEl.setAttribute('name', 'status-change');
    statusSelectEl.setAttribute('data-task-id', taskId);

    var statusChoices = ['To Do', 'In Progress', 'Completed'];
    for (var i=0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement('option');
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute('value', statusChoices[i]);

        // console.log(statusOptionEl);
        // append to select
        statusSelectEl.appendChild(statusOptionEl);

    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

formEl.addEventListener('submit', taskFormHandler);

var taskButtonHandler = function(event) {
    // event.target reports the element on which the event occurs/ the element that triggered the event
    // shows that every element in the pageContentEl can be clicked
    // console.log(event.target);

    // get target element from event
    var targetEl = event.target;

    // to make sure we do not target every element but only certain ones we can use the matches() method
    if (targetEl.matches('.edit-btn')) {
        // get the elements task id
        var taskId = targetEl.getAttribute('data-task-id');
        editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches('.delete-btn')) {
        var taskId = targetEl.getAttribute('data-task-id');
        deleteTask(taskId);
        // console.log(taskId);
    }
};

var editTask = function(taskId) {
    // debugger;
    // get task list item element
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskId + '"]');

    // get content from task name and type
    var taskName = taskSelected.querySelector('h3.task-name').textContent

    var taskType = taskSelected.querySelector('span.task-type').textContent;
    console.log(taskName, taskType);

    // reuse the selectors from before and update the form
    // makes our values from h3 and span appear in the input and select field
    document.querySelector('input[name="task-name"]').value = taskName;
    document.querySelector('select[name="task-type"]').value = taskType;

    // change Add Task button to say Save Task
    document.querySelector('#save-task').textContent = 'Save Task';

    // adds the taskId to a data-task-id attribute that will help us to save the correct task
    formEl.setAttribute("data-task-id", taskId);
};

var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskId + '"]');
    // debugger;

    // set new values
    taskSelected.querySelector('h3.task-name').textContent = taskName;
    taskSelected.querySelector('span.task-type').textContent = taskType;
    console.log(taskName, taskType);

    alert('Task Updated');

    // reset the form by removing the task id and changing the button text back to normal
    formEl.removeAttribute('data-task-id');
    document.querySelector('#save-task').textContent = 'Add Task';
;}

var deleteTask = function(taskId) {
    // we are selecting the list item element by using the task-item class (for li element type) and then drill down by using the data-task-id attribute. We are using the attribute equal to the argument we passed into the function
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskId + '"]')
    // remove the task (li) from our list using the remove() method
    taskSelected.remove();
};

var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute('data-task-id');

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
    // console.log(statusValue)
    // console.log(event.target);

    // find the parent task item element based on the id
    var taskSelected = document.querySelector('.task-item[data-task-id="' + taskId + '"]');
    // console.log(taskSelected);
    console.log(taskToDoEl);
    console.log(taskInProgressEl);
    console.log(taskCompletedEl);



    if (statusValue === "to do") {
        taskToDoEl.appendChild(taskSelected);
      } 
      else if (statusValue === "in progress") {
        taskInProgressEl.appendChild(taskSelected);
      } 
      else if (statusValue === "completed") {
        taskCompletedEl.appendChild(taskSelected);
      }
};

pageContentEl.addEventListener('click', taskButtonHandler);

// event istener for select dropdown change
pageContentEl.addEventListener('change', taskStatusChangeHandler);