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
    renderCalendarHeader();
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

function renderCalendarHeader() {
    let monthName = getMonthName(month);
    let calendarHeader = document.getElementById("calendar-header");
    calendarHeader.innerHTML = monthName + " " + year;
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

function getMonthName(month) {
    switch(month) {
        case 01: return "Januari";
        case 02: return "Februari";
        case 03: return "Mars";
        case 04: return "April";
        case 05: return "Maj";
        case 06: return "Juni";
        case 07: return "Juli";
        case 08: return "Augusti";
        case 09: return "September";
        case 10: return "Oktober";
        case 11: return "November";
        case 12: return "December";
        
    }
}
//"".split("-")