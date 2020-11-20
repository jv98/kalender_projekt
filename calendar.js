window.addEventListener("load", main)

function main() {
    fetchDays();
}

function fetchDays() {
    $.ajax({
        url: "http://sholiday.faboul.se/dagar/v2.1/2020/11",
        type: "GET",
        dataType: "jsonp",
        success: function(response) {
            console.log(response.dagar)
            addCalendar(response.dagar);
        }
    });
}

function addCalendar(daysInAMonth) {
    const container = document.getElementById("calendar-div");
    container.innerHTML = "";

    const dayDivs = createDayDivs(daysInAMonth);
    container.append(...dayDivs);
}

function createDayDivs(days) { 
    const dayDivs = [];  
    
    if(days[0].veckodag === "Söndag") {
        for( let i=0; i<6; i++ ) {
            const emptyDiv = document.createElement("div")
            emptyDiv.innerHTML = "";
            dayDivs.push(emptyDiv);
        }
    }

    for (const day of days) {
        const dayDiv = document.createElement("div")
        dayDiv.innerHTML = day.datum;
        dayDivs.push(dayDiv); 
    }
    return dayDivs;
}