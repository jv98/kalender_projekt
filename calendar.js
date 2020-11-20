function renderCalendar() {
    fetchDays();
    renderCalendarHeader();
}

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

function fetchDays() {
    $.ajax({
        url: `http://sholiday.faboul.se/dagar/v2.1/${year}/${month}`,
        type: "GET",
        dataType: "jsonp",
        success: function(response) {
            renderDays(response.dagar);
        }
    });
}

function renderCalendarHeader() {
    let monthName = getMonthName(month);
    let calendarHeader = document.getElementById("calendar-header");
    calendarHeader.innerHTML = monthName + " " + year;
}

function renderDays(daysInAMonth) {
    const container = document.getElementById("calendar-div");
    container.innerHTML = "";

    const dayDivs = createDayDivs(daysInAMonth);
    container.append(...dayDivs);
}

function createDayDivs(days) { 
    const dayDivs = [];  
    const weekdayIndex = getWeekdayIndex(days[0].veckodag)

        for ( let i=0; i<weekdayIndex; i++ ) {
            const emptyDiv = document.createElement("div")
            emptyDiv.innerHTML = "";
            dayDivs.push(emptyDiv);
        }

    for (const day of days) {
        const dayDiv = document.createElement("div")
        //ATT FIXA: hämta todos för det aktuella datumet
        if (day.helgdag !== undefined) {
            dayDiv.innerHTML = day.datum.split("-")[2] + " " + day.helgdag;
            dayDiv.style.color = "red";
        }
        else {
            dayDiv.innerHTML = day.datum.split("-")[2];
        }
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