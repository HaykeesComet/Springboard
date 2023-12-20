document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTaskButton');
  const taskList = document.getElementById('taskList');
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function createTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      const taskText = document.createElement('span');
      taskText.textContent = task;
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'X';

      taskText.addEventListener('click', function () {
        li.classList.toggle('completed');
        updateLocalStorage();
      });

      removeBtn.addEventListener('click', function () {
        removeTask(index);
      });

      li.appendChild(taskText);
      li.appendChild(removeBtn);
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      tasks.push(taskText);
      updateLocalStorage();
      taskInput.value = '';
      createTasks();
    } 
  }

  function removeTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    createTasks();
  }

  function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  addTaskButton.addEventListener('click', addTask);
  createTasks();
});
