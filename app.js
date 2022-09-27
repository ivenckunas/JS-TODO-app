// Selectors

const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");

// Event listeners

todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

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
    todo.remove();
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}
