const toDoform = document.querySelector(".js_toDoForm"),
    toDoinput = toDoform.querySelector("#todoinput"),
    toDoList = document.querySelector(".js_toDoList");

const TODOS_Ls = 'toDos';

function displayToDo(text) {
    const il = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.value = "x"
    const span = docuemnt.createElement("span");
    span.innerText = text;
}

function handleSumbit(event) {
    event.preventDefault();
    const currnetValue = toDoinput.value;
    displayToDo(currnetValue);
    toDoinput.value = "";
}

function loadToDos() {
    const toDos = localStorage.getItem(TODOS_Ls);
    if(toDos === null){

    }
}

function init() {
    loadToDos()
    toDoform.addEventListener("sumbit", handleSumbit)
}

init()