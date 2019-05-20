
const checkInButton = document.getElementById("check-in");
const checkOutButton = document.getElementById("check-out");

function addTempTextBeneathButtons(text) {
    const textNode = document.createTextNode(text);
    const buttonsDiv = document.querySelector(".buttons");
    buttonsDiv.appendChild(textNode);
    setTimeout(() => buttonsDiv.removeChild(textNode), 5000);
}

function checkIn() {
    if(work.length < 1 || work[work.length-1].checkOut != 0) {
        const time = new Date;
        const task = prompt("Hva skal du gjøre?");
        work.push({"checkIn": time, "task": task, "checkOut": 0, "timeSpent": 0});
        addTempTextBeneathButtons("sjekket inn!");
        updateCurrentTable(work[work.length-1]);
    } else {
        addTempTextBeneathButtons("Du må sjekke ut først!");
    }
}

function checkOut() {
    if(work[work.length-1].checkOut == 0) {
        work[work.length-1].checkOut = new Date;
        work[work.length-1].timeSpent = calculateWorkTime(work[work.length-1].checkIn, work[work.length-1].checkOut);
        addTempTextBeneathButtons("Sjekket ut!");
        currentTaskTable.deleteRow(1);
        currentTaskTable.style.display = "none";
        createNewTaskRow(work[work.length-1]);
        tasksRef.add(work[work.length - 1]).catch(function(error) {console.error("Error adding document: ", error)});
    } else {
        addTempTextBeneathButtons("Du må sjekke inn først!");
    }
}

//function to make date object readable
function understandTime(time) {

    let year = String(time.getFullYear());

    let newDate = String(time.getDate()).padStart(2,0) + "." + String(time.getMonth() + 1).padStart(2,0) + "." + year[2] + year[3];
    let timeOfDay = String(time.getHours()).padStart(2,0) + ":" + String(time.getMinutes()).padStart(2,0);

    return [newDate, timeOfDay];
};

function calculateWorkTime (start, end) {

    let checkInTime = /(\d\d):(\d\d)/.exec(start);
    let checkOut = /(\d\d):(\d\d)/.exec(end);

    let hoursSpent = checkOut[1] - checkInTime[1];
    let minutesSpent = checkOut[2] - checkInTime[2];

    let returnString = "";

    if (minutesSpent == 1) {returnString = minutesSpent + " minutt";
    } else {returnString = minutesSpent + " minutter";};  

    if (hoursSpent == 0) {return returnString};
    
    if (hoursSpent == 1) {returnString = hoursSpent + " time og " + returnString;
    } else {returnString = hoursSpent + " timer og " + returnString}
    
    return returnString;
};

//eventlisteners for buttons
checkInButton.addEventListener("click", checkIn);
checkOutButton.addEventListener("click", checkOut);