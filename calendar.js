/** renders the calendar on the page */
function renderCalendar() {
    fetchDays();
    renderCalendarHeader();
}

/** shows previous month in the calendar */
function showPreviousMonth() {
    if(month == 01) {
        year--;
        month = 12;
    }
    else {
    month--;
    }
    renderCalendar();
}

/** shows next month in the calendar */
function showNextMonth() {
    if(month == 12) {
        year++;
        month = 01;
    }
    else {
    month++;
    }
    renderCalendar();
}

/** fetches an array of the days of the current month from the API */
function fetchDays() {
    $.ajax({
        url: `https://sholiday.faboul.se/dagar/v2.1/${year}/${month}`,
        type: "GET",
        dataType: "jsonp",
        success: function(response) {
            renderDays(response.dagar);
        }
    });
}

/** renders the calendar header that displays month and year */
function renderCalendarHeader() {
    let monthName = getMonthName(month);
    let calendarHeader = document.getElementById("calendar-header");
    calendarHeader.innerHTML = monthName + " " + year;
}

/** adds days to the calendar container */
function renderDays(daysInAMonth) {
    const container = document.getElementById("calendar-div");
    container.innerHTML = "";

    const dayDivs = createDayDivs(daysInAMonth);
    container.append(...dayDivs);
}

/** 
 * creates an array of divs of the days of the month 
 * containing the date and the name of the holiday if it is a holiday,
 * also adds empty divs if the month doesn't start on a monday
 */
function createDayDivs(days) { 
    const dayDivs = [];  
    const weekdayIndex = getWeekdayIndex(days[0].veckodag)

        for ( let i=0; i<weekdayIndex; i++ ) {
            const emptyDiv = document.createElement("div")
            emptyDiv.innerHTML = "";
            dayDivs.push(emptyDiv);
        }
        
    for (const day of days) {
        const countOnDate = getTodos(day.datum); // this get the numbers from row 131 also counts how many it dos for that day
        const dayDiv = document.createElement("div")
        //ATT FIXA: hämta todos för det aktuella datumet
        if (day.helgdag !== undefined) {
            dayDiv.innerHTML = day.datum.split("-")[2] + " " + day.helgdag;
            dayDiv.style.color = "red";
        }
        else {
            dayDiv.innerHTML = day.datum.split("-")[2]; 
        }
        // crates the p tag that get nummber inside of it
        if (countOnDate > 0) {
            let calendarTodoContainer = document.createElement("p")
            calendarTodoContainer.innerHTML = countOnDate;
            dayDiv.appendChild(calendarTodoContainer);
            
        }
        dayDivs.push(dayDiv); 
        console.log(day)
    }
   
    
 return dayDivs;
} 

/** creates an index for the first day of the month, depending on which weekday it is */
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

/** converts the number of each month to its name */
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

// this count how many todo that are in todo list
function getTodos(date) {
        let x = 0;
    for (const todoItem of todoList) {
     
        if (todoItem.date === date) {
            x++
            
        }
    }   
    console.log(x)
    return x;
}