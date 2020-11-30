function showTimeDate() {
    let today = new Date();

    //sets current time  
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    if (h === 24) {
        h = 0;
    } else if (h > 12) {
        h = h - 0;
    }

    if (h < 10) {
        h = "0" + h;
    }

    if (m < 10) {
        m = "0" + m;
    }

    if (s < 10) {
        s = "0" + s;
    }
    
    //sets date, weekday and month
    let date = today.getDate();
    let day = today.getDay();
    let month = today.getMonth();
    let year = today.getYear();
    //sets current year
    if (year < 2020) {
        year += 1900
    }
    let weekdayarray = Array("Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag");
    let montharray = Array("Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December");


    let displayTimeDate = document.getElementById("timeDate");

    //makes the clock tick every second
    setTimeout("showTimeDate()", 1000)

    //displays current time, weekday and date on page
    displayTimeDate.textContent = weekdayarray[day] + " " + date + " " + montharray[month] + " " + year + ' | ' + h + ":" + m + ":" + s;
    displayTimeDate.innerText = weekdayarray[day] + " " + date + " " + montharray[month] + " " + year + " | " + h + ":" + m + ":" + s;
}