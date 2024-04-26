const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listFull = document.querySelector('.list-tasks');

let myListTasks = [];


function addNewTask () {
  myListTasks.push({
    task: input.value,
    taskCompleted: false
  });
  clearInput(); 
  showTask();
}


function showTask() {

  let list = ''
  myListTasks.forEach((item, index) => {
    list = list + `
    <li class="task ${item.taskCompleted && "done"}">
    <img src="./img/checked.png" alt="check" onClick="buttonTaskCompleted(${index})">
      <p>${item.task}</p>
    <img src="./img/trash.png" alt="trash" onClick="deleteItem(${index})">
    </li>
    `
  }
)
  listFull.innerHTML = list;

  localStorage.setItem('lists', JSON.stringify(myListTasks))
}

function clearInput() {
  document.querySelector(".input-task").value = "";
}

function buttonTaskCompleted(index) {
myListTasks[index].taskCompleted = !myListTasks[index].taskCompleted
showTask()
}

function deleteItem (index) {
  myListTasks.splice(index, 1)

  showTask()
}

function reloadTasks() {
  if(myListTasks) {
    const storage = localStorage.getItem('lists')
    myListTasks = JSON.parse(storage)
  }
  

  showTask()
}


reloadTasks()
button.addEventListener('click', addNewTask)
input.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addNewTask();
  }
});