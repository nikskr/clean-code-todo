const taskInput = document.getElementById('new-task'); // Input for new task
const addButton = document.getElementById('button-add'); // Button for creating new task
const incompletedTaskHolder = document.getElementById('incompleted-tasks'); // ul of #incompleted-tasks
const completedTasksHolder = document.getElementById('completed-tasks'); // ul of #completed-tasks

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'button--edit';

  deleteButton.className = 'button--delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompletedTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = '';
};

const fillTaskFields = function (listItem) {
  const isTaskEditMode = listItem.classList.contains('edit-mode');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.button--edit');
  const editInput = listItem.querySelector('input[type=text]');

  if (isTaskEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }
};

const editTask = function () {
  const listItem = this.parentNode;

  fillTaskFields(listItem);

  listItem.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const taskList = listItem.parentNode;
  taskList.removeChild(listItem);
};

const handleTaskCheckBoxEvent = function () {
  const listItem = this.parentNode;
  const isTaskCompleted = listItem.querySelector('input[type=checkbox]').checked;
  if (isTaskCompleted) {
    completedTasksHolder.appendChild(listItem);
  } else {
    incompletedTaskHolder.appendChild(listItem);
  }
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.button--edit');
  const deleteButton = taskListItem.querySelector('button.button--delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = handleTaskCheckBoxEvent;
};

for (let i = 0; i < incompletedTaskHolder.children.length; i++) {
  bindTaskEvents(incompletedTaskHolder.children[i]);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i]);
}

// Issues with usability don't get seen until they are in front of a human tester.
