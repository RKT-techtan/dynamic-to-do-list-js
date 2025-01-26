// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the necessary elements
    var addButton = document.getElementById('add-task-btn');
    var taskInput = document.getElementById('task-input');
    var taskList = document.getElementById('task-list');
  
    // Function to add a new task to the list
    function addTask() {
      // Get the task text from the input field and remove leading/trailing whitespace
      var taskText = taskInput.value.trim(); 
  
      // Check if the user actually entered something
      if (taskText === "") {
        alert("Hey, you gotta enter something to do!"); 
        return; 
      }
  
      // Create a new list item for the task
      var listItem = document.createElement('li');
      listItem.textContent = taskText;
  
      // Create a button to remove the task
      var removeButton = document.createElement('button');
      removeButton.textContent = "Remove"; 
      removeButton.classList.add("remove-btn"); 
  
      // Make the remove button actually remove the task
      removeButton.addEventListener('click', function() {
        listItem.remove(); 
  
        // Update the stored tasks in localStorage
        var storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
          var tasks = JSON.parse(storedTasks);
          tasks = tasks.filter(function(task) { 
            return task !== taskText; 
          });
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
      });
  
      // Add the remove button to the task item
      listItem.appendChild(removeButton); 
  
      // Add the new task item to the task list
      taskList.appendChild(listItem);
  
      // Store the new task in localStorage
      var storedTasks = localStorage.getItem('tasks'); 
      var tasks = storedTasks ? JSON.parse(storedTasks) : []; 
      tasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  
      // Clear the input field 
      taskInput.value = ''; 
    }
  
    // Function to load any previously stored tasks
    function loadTasks() {
      var storedTasks = localStorage.getItem('tasks');
  
      if (storedTasks) {
        var tasks = JSON.parse(storedTasks);
  
        tasks.forEach(function(taskText) {
          var listItem = document.createElement('li');
          listItem.textContent = taskText;
  
          var removeButton = document.createElement('button');
          removeButton.textContent = "Remove";
          removeButton.classList.add("remove-btn");
          removeButton.addEventListener('click', function() {
            listItem.remove();
  
            // Update the stored tasks in localStorage
            var storedTasks = localStorage.getItem('tasks');
            var tasks = JSON.parse(storedTasks); 
            tasks = tasks.filter(function(task) { 
              return task !== taskText; 
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
          });
  
          listItem.appendChild(removeButton);
          taskList.appendChild(listItem);
        });
      }
    }
  
    // Add an event listener to the add button
    addButton.addEventListener('click', addTask);
  
    // Add an event listener to the input field for Enter key presses
    taskInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  
    // Load any existing tasks when the page loads
    loadTasks();
  });