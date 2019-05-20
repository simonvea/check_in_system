
const oldTasksTable = document.querySelector("#timetable");
const currentTaskTable = document.querySelector("#currentTask");
const work = [];

//get db from firebase
tasksRef.get().then((querySnapshot) => {
    querySnapshot.forEach(doc => {
        const task = doc.data();
        task.checkIn = task.checkIn.toDate();
        task.checkOut = task.checkOut.toDate();
        work.push(task);
        createNewTaskRow(task);
    }
)});

function createTasksTable() {
    work.forEach(task => createNewTaskRow(task))
}

//create or update row in currentTaskTable
function updateCurrentTable(task) {
    let dateCell;
    let checkInCell;
    let assignementCell;

    if (currentTaskTable.rows[1] == undefined) {
        let row = currentTaskTable.insertRow(1);
        dateCell = row.insertCell(0);
        checkInCell = row.insertCell(1);
        assignementCell = row.insertCell(2);
        currentTaskTable.style.display = "inline";
    } else {
        dateCell = currentTaskTable.rows[1].cells[0];
        checkInCell = currentTaskTable.rows[1].cells[1];
        assignementCell = currentTaskTable.rows[1].cells[2];
    }

    //make time readable
    let checkInTime = understandTime(task.checkIn);

    //create time elements
    let timeCellTimeElement = document.createElement("time");
    let checkInTimeElement = document.createElement("time");

    //creating contents of cells
    let timeNode = document.createTextNode(checkInTime[0]); //dd.mm.yy
    let checkInNode = document.createTextNode(checkInTime[1]); //hh:mm
    let assignmentNode = document.createTextNode(task.task);

    //poulating cells
    timeCellTimeElement.appendChild(timeNode);
    dateCell.appendChild(timeCellTimeElement);
    checkInTimeElement.appendChild(checkInNode);
    checkInCell.appendChild(checkInTimeElement);
    assignementCell.appendChild(assignmentNode);
}

//create rows in oldTasksTable
function createNewTaskRow(task) {
    //create rows with cells
    let newRow = oldTasksTable.insertRow(1);
    let timeCell = newRow.insertCell(0);
    let checkInCell = newRow.insertCell(1);
    let checkOutCell = newRow.insertCell(2);
    let timeSpentCell = newRow.insertCell(3);
    let assignementCell = newRow.insertCell(4);
    
    //make time readable
    let checkInTime = understandTime(task.checkIn);
    let checkOutTime = understandTime(task.checkOut);

    //creating time elements
    let timeCellTimeElement = document.createElement("time");
    let checkInTimeElement = document.createElement("time");
    let checkOutTimeElement = document.createElement("time");

    //creating contents of cells
    let timeNode = document.createTextNode(checkInTime[0]); //dd.mm.yy
    let checkInNode = document.createTextNode(checkInTime[1]); //hh:mm
    let checkOutNode = document.createTextNode(checkOutTime[1]); //hh:mm
    let timeSpentNode = document.createTextNode(task.timeSpent);
    let assignmentNode = document.createTextNode(task.task);

    //poulating cells
    timeCellTimeElement.appendChild(timeNode);
    timeCell.appendChild(timeCellTimeElement);
    checkInTimeElement.appendChild(checkInNode);
    checkInCell.appendChild(checkInTimeElement);
    checkOutTimeElement.appendChild(checkOutNode);
    checkOutCell.appendChild(checkOutTimeElement);
    timeSpentCell.appendChild(timeSpentNode);
    assignementCell.appendChild(assignmentNode);
}