
const checkInButton = document.getElementById("check-in");
const checkOutButton = document.getElementById("check-out");
const timeTable = document.querySelector("table");

//function to make date object readable
function understandTime(time) {

    let date = /(\w\w\w) (\d\d) \d\d(\d\d)/i.exec(time);
    //year is date[3], month is date[1] and current day is date[2]
    let timeOfDay = /\d\d:\d\d/.exec(time);
    //hour is timeOfDay[1], minutes is timeOfDay[2]

    let newDate = date[2] + "." + date[1] + "." + date[3];

    return [newDate, timeOfDay[0]];
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

function addCheckInTotable(inputArray) {

    //inputArray har formen [currentTime, Todo], gjør currentTime litt bedre
    let time = understandTime(inputArray[0]);

    let newRow = timeTable.insertRow(1);
    let timeCell = newRow.insertCell(0);
    let checkInCell = newRow.insertCell(1);
    let blankCell1 = newRow.insertCell(2);
    let blankCell2 = newRow.insertCell(3);
    let assignementCell = newRow.insertCell(4);

    let timeNode = document.createTextNode(time[0]); //dd.mm.yy
    let checkInNode = document.createTextNode(time[1]); //hh:mm
    let assignmentNode = document.createTextNode("Planlagt: " + inputArray[1]);
    
    timeCell.appendChild(timeNode);
    checkInCell.appendChild(checkInNode);
    assignementCell.appendChild(assignmentNode);
};

function addCheckOutToTable (inputArray) {

    let time = understandTime(inputArray[0]);

    let checkOutCell = timeTable.rows[1].cells[2];
    let timeSpentCell = timeTable.rows[1].cells[3];
    let assignementCell = timeTable.rows[1].cells[4];

    let checkOutNode = document.createTextNode(time[1]); //hh:mm
    let timeSpentNode = document.createTextNode(calculateWorkTime(time[1]));
    //let assignmentNode = document.createTextNode("Gjort: " + inputArray[1]);

    checkOutCell.appendChild(checkOutNode);
    timeSpentCell.appendChild(timeSpentNode);
    //assignementCell.appendChild(assignmentNode);
};

function calculateWorkTime (checkOutTime) {

    let checkInTime = /(\d\d):(\d\d)/.exec(timeTable.rows[1].cells[1].innerHTML);
    let checkOut = /(\d\d):(\d\d)/.exec(checkOutTime);

    let hoursSpent = checkOut[1] - checkInTime[1];
    let minutesSpent = checkOut[2] - checkInTime[2];

    if (hoursSpent == 0) return minutesSpent + " minutter";
    
    return hoursSpent + " timer og " + minutesSpent + " minutter";
}

//eventlisteners for buttons
checkInButton.addEventListener("click", () => {
    if(timeTable.rows[1].cells[2].innerHTML == "") return; //if checkout cell is emtpy disables possibility for new check in
    addCheckInTotable(checkIn())
});
checkOutButton.addEventListener("click", () => {
    addCheckOutToTable(checkOut());
});