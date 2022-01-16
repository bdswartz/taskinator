var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

var taskIdCounter = 0;


var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
      };
    formEl.reset();
    
    var isEdit = formEl.hasAttribute("data-task-id");
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }

    else {
        // Create Object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
          };
    //   Call Create Task Function and send object as argument
    createTaskEl(taskDataObj);
};
};

var completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

  };

var createTaskEl = function(taskDataObj) {
    // Create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter)
 
    // Create a div to hold task info and add it to the list item
    var taskInfoEl = document.createElement("div");

    // Give it a class name
    taskInfoEl.className = "task-info";

    // Add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
   
    listItemEl.appendChild(taskInfoEl);
    // Review and understand  it is late
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);
    
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    taskIdCounter++;

};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent ="Delete";
    deleteButtonEl.className ="btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    // create select element
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
};
var taskButtonHandler = function(event) {
    console.log(event.target);
    if (event.target.matches(".delete-btn")) {
        console.log("you clicked a delete button!");
        var taskId = event.target.getAttribute("data-task-id");
    console.log(taskId);
    };
    if (event.target.matches(".edit-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }
    else if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
  };

  var deleteTask = function(taskId) {
    console.log(taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
  };
  var editTask = function(taskId) {
    console.log("editing task #" + taskId);
  
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
    };

pageContentEl.addEventListener("click", taskButtonHandler);

formEl.addEventListener("submit", taskFormHandler);