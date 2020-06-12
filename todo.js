const toDoform = document.querySelector(".js_toDoForm"),
    toDoInput = toDoform.querySelector("input"),
    toDoList = document.querySelector(".js_toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveTodos();
  }

function displayToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo)
    span.innerText = text;
    if(text !== ''){
        li.appendChild(span);
        li.appendChild(delBtn);
        li.id = newId;
        toDoList.appendChild(li);
        const todoObj = {
            text: text,
            id: newId
        };
        toDos.push(todoObj);
        saveTodos()
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    displayToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedtoDos = localStorage.getItem(TODOS_LS);
    if(loadedtoDos !== null){
        const paresdToDos = JSON.parse(loadedtoDos);
        paresdToDos.forEach(function(todo) {
            displayToDo(todo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoform.addEventListener("submit", handleSubmit);
}

init();
