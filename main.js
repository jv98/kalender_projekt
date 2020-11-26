window.addEventListener("load", main);

let year = 2020;
let month = 11;

function main() {
    addEventListeners();
    renderCalendar();
    renderTodos();
    getTodos();
    
    
    
}

function addEventListeners() {
    const previousMonthIcon = document.getElementById("previous-month-icon");
    previousMonthIcon.addEventListener("click", showPreviousMonth);

    const nextMonthIcon = document.getElementById("next-month-icon");
    nextMonthIcon.addEventListener("click", showNextMonth);
}

