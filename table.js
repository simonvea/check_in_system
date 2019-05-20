
const timeTable = document.querySelector("table");
const work = [];

function createTable() {
    work.forEach(task => createNewRow(task))
}

function createNewRow(task) {
           //create rows with cells
           let newRow = timeTable.insertRow(1);
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
           let assignmentNode = document.createTextNode("Planlagt: " + task.task);
   
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