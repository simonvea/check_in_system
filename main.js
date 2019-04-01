
const checkInButton = document.getElementById("check-in");
const checkOutButton = document.getElementById("check-out");
const timeTable = document.querySelector(".timetable");

//function to make date object readable
function understandTime(time) {

    let date = /(\w\w\w) (\d\d) (\d\d\d\d)/i.exec(time);
    //year is date[3], month is date[1] and current day is date[2]
    let timeOfDay = /(\d\d):(\d\d)/.exec(time);
    //hour is timeOfDay[1], minutes is timeOfDay[2]

    return {date, timeOfDay};
};

function checkIn() {
    let currentTime = new Date();
    let todo = prompt("Hva skal du gjøre?");

    return [currentTime, todo];
    //{"Time": currentTime, "ToDo": todo, "done": false}
};

function checkOut() {
    let currentTime = new Date();
    let todo = prompt("Hva har du gjort?");  

    return [currentTime, todo];
    //{"Time": currentTime, "ToDo": todo, "done": true}
};

function addCheckInTotable(time) {
    let checkInTime = document.createElement("h2")
    let textnode = document.createTextNode("Tid: " + time[0] + "\nOppgave: " + time[1]);
    
    checkInTime.appendChild(textnode);
    timeTable.appendChild(checkInTime);
};


//eventlisteners for buttons
checkInButton.addEventListener("click", () => addCheckInTotable(checkIn()));
checkOutButton.addEventListener("click", checkOut);