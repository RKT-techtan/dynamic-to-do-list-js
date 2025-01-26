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
      // Use classList.add to add the class
      removeButton.classList.add("remove-btn"); 
  
      // Add event listener to remove button
      removeButton.addEventListener('click', () => {
        listItem.remove();
      });
  
      // Append the remove button to the list item
      listItem.appendChild(removeButton);
  
      // Append the list item to the task list
      taskList.appendChild(listItem);
  
      // Clear the task input field
      taskInput.value = "";
    }
  
    // Add event listener to the add button
    addButton.addEventListener('click', addTask);
  
    // Add event listener to the input field for Enter key press
    taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  });