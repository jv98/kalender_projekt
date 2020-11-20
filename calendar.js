window.addEventListener("load", main)
let year = 2020;
let month = 11;

function main() {
    addEventListeners();
    showCalendar();
}

function addEventListeners() {
    const previousMonthIcon = document.getElementById("previous-month-icon");
    previousMonthIcon.addEventListener("click", showPreviousMonth);

    const nextMonthIcon = document.getElementById("next-month-icon");
    nextMonthIcon.addEventListener("click", showNextMonth);
}


function showPreviousMonth() {
    if(month == 01) {
        year--;
        month = 12;
    }
    else {
    month--;
    }
    showCalendar();

}
function showNextMonth() {
    if(month == 12) {
        year++;
        month = 01;
    }
    else {
    month++;
    }
    showCalendar();

}
function showCalendar() {
    fetchDays();
    ren
}
function fetchDays() {
    $.ajax({
        url: `http://sholiday.faboul.se/dagar/v2.1/${year}/${month}`,
        type: "GET",
        dataType: "jsonp",
        success: function(response) {
            renderCalendar(response.dagar);
        }
    });
}

function renderCalendar(daysInAMonth) {
    const container = document.getElementById("calendar-div");
    container.innerHTML = "";

    const dayDivs = createDayDivs(daysInAMonth);
    container.append(...dayDivs);
}

function createDayDivs(days) { 
    const dayDivs = [];  
    const weekdayIndex = getWeekdayIndex(days[0].veckodag)

        for( let i=0; i<weekdayIndex; i++ ) {
            const emptyDiv = document.createElement("div")
            emptyDiv.innerHTML = "";
            dayDivs.push(emptyDiv);
        }


    for (const day of days) {
        const dayDiv = document.createElement("div")
        //hämta todos för datumet
        dayDiv.innerHTML = day.datum.split("-")[2];
        dayDivs.push(dayDiv); 
    }
    return dayDivs;
}

function getWeekdayIndex(weekday){
    switch(weekday) {
        case "Måndag": return 0;
        case "Tisdag": return 1;
        case "Onsdag": return 2;
        case "Torsdag": return 3;
        case "Fredag": return 4;
        case "Lördag": return 5;
        case "Söndag": return 6;
    }
}
//"".split("-")