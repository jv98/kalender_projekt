window.addEventListener("load", main);

const date = new Date ();
let year = date.getFullYear();
let month = date.getMonth() + 1;

function main() {
    addEventListeners();
    getFromLocalStorage(); 
    showTimeDate();
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

