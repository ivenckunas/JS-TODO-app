// Selectors

const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo');

// Event listeners

document.addEventListener('DOMContentLoaded', getTodos)
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo)

// Function

function addTodo(e) {
  e.preventDefault();
  // Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create li
  const newTodo = document.createElement("li");
  newTodo.textContent = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //Add todo to localStorage
  saveLocalTodos(todoInput.value);
  //Check mark btn
  const completed = document.createElement("button");
  completed.innerHTML = '<i class="fas fa-check"></i>';
  completed.classList.add("complete-btn");
  todoDiv.appendChild(completed);
  //Delete btn
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.classList.add("delete-btn");
  todoDiv.appendChild(deleteBtn);
  //Append to list
  todoList.appendChild(todoDiv);

  //Clear input value
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    const mStyle = todo.style;
    if (mStyle != undefined && mStyle != null) {
      switch (e.target.value) {
        case "all":
          mStyle.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains('completed')) {
            mStyle.display = 'flex';
          } else {
            mStyle.display = "none";
          }
          break;
        case "uncompleted":
          if (todo.classList.contains('completed')) {
            mStyle.display = 'none';
          }
          else {
            mStyle.display = "flex";
          }
          break;
      }
    }
  })
}

function saveLocalTodos(todo) {
  //check if local storage is empty
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  //check if local storage is empty
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.forEach(function (todo) {
    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create li
    const newTodo = document.createElement("li");
    newTodo.textContent = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //Check mark btn
    const completed = document.createElement("button");
    completed.innerHTML = '<i class="fas fa-check"></i>';
    completed.classList.add("complete-btn");
    todoDiv.appendChild(completed);
    //Delete btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);
    //Append to list
    todoList.appendChild(todoDiv);
  })
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
