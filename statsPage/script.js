let tableContainer = document.querySelectorAll(".tableBox");
let standingBox = tableContainer[0];
let hittingBox = tableContainer[1];

let hitTable =document.createElement("table");
hittingBox.appendChild(hitTable);
let headingRow = document.createElement("tr");
for(let i=0;i<11;i++) {
    if(i>0 || i>9) {
        let header = document.createElement("th");
        header.innerText = i+1;
        hitTable.appendChild(header);   
        if (i>9) {
        header.innerText = "A";
        hitTable.appendChild(header);       
        }    
    }
    else {
        let header = document.createElement("th");    
        hitTable.appendChild(header); 
    }      
}

for (let i = 10; i>0; i--) {
    let dataRow = document.createElement("tr");
    hitTable.appendChild(dataRow);
    for (let j=0; j<10;j++) { 
        if (j ==0) {
            let heading = document.createElement("th");
            heading.innerText = `${i+7}`;
            dataRow.appendChild(heading);
        }
        if (j ==9) {
            let dataCell = document.createElement("td");
            dataCell.innerText ="0/0";
            dataCell.classList.add(`H${i+7}/A`);
            dataRow.appendChild(dataCell);
        }
        else {
            let dataCell = document.createElement("td");
            dataCell.innerText ="0/0";
            dataCell.classList.add(`H${i+7}/${j+2}`);
            dataRow.appendChild(dataCell);
        }
    }
}

let hitTableTd = hitTable.querySelectorAll("td");
hitTableTd.forEach(td => {
    let storageString = localStorage.getItem(`${td.className}`);
    if(storageString !==null) {
       td.innerText=storageString;
    }
});