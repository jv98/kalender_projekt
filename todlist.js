const todoList = [{
    title: "Nils fyller år",
    date: "2020-11-25"
}, {
    title: "Nils fyller år",
    date: "2020-11-25"
}]

function renderTodos() {
    const todoContainer = document.getElementById("todo-container");
    todoContainer.innerHTML = "";

    for(const todo of todoList) {
        const listItem = document.createElement("li");
        listItem.innerHTML = todo.date + ": " + todo.title;
        listItem.addEventListener('click', function(){
            todoList.splice(todoList.indexOf(todo),1)
            listItem.remove()
           
        });
        todoContainer.append(listItem);
    }
}

function addNewTodo() {
    const todoTitle = document.getElementById("todo-input").value;
    const todoDate = document.getElementById("date-input").value;

    let newTodo = {title: todoTitle, date: todoDate};

    todoList.push(newTodo);
    renderTodos(); 
    renderCalendar();   
}

