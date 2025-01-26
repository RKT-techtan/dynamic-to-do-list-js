document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Function to add a new task
    function addTask() { 
      // Retrieve and trim the task text
      let taskText = taskInput.value.trim();
  
      // Check if the task text is empty
      if (taskText === "") {
        alert("Please enter a task!");
        return;
      }
  
      // Create a new list item
      const listItem = document.createElement('li');
      listItem.textContent = taskText;
  
      // Create a remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn"); 
  
      // Add event listener to remove button
      removeButton.addEventListener('click', () => {
        listItem.remove();
  
        // Update stored tasks after removal
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
          const tasks = JSON.parse(storedTasks);
          const updatedTasks = tasks.filter(t => t !== taskText);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        }
      });
  
      // Append the remove button to the list item
      listItem.appendChild(removeButton);
  
      // Append the list item to the task list
      taskList.appendChild(listItem);
  
      // Store the new task in localStorage
      const storedTasks = localStorage.getItem('tasks');
      let tasks = [];
      if (storedTasks) {
        tasks = JSON.parse(storedTasks);
      }
      tasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  
      // Clear the task input field
      taskInput.value = "";
    }
  
    // Function to load tasks from localStorage
    function loadTasks() {
      const storedTasks = localStorage.getItem('tasks');
  
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
  
        tasks.forEach(taskText => {
          const listItem = document.createElement('li');
          listItem.textContent = taskText;
  
          const removeButton = document.createElement('button');
          removeButton.textContent = "Remove";
          removeButton.classList.add("remove-btn"); 
          removeButton.addEventListener('click', () => {
            listItem.remove();
  
            // Update stored tasks after removal
            const updatedTasks = tasks.filter(t => t !== taskText);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
          });
  
          listItem.appendChild(removeButton);
          taskList.appendChild(listItem);
        });
      }
    }
  
    // Add event listener to the add button
    addButton.addEventListener('click', addTask);
  
    // Add event listener to the input field for Enter key press
    taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  
    // Load tasks on page load
    loadTasks(); 
  });