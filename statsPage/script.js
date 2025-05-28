let tableContainer = document.querySelectorAll(".tableBox");
let standingBox = tableContainer[0];
let hittingBox = tableContainer[1];



function createTable (tableBox, char) {
    let table = document.createElement("table");
    tableBox.appendChild(table);
    let headingRow = document.createElement("tr");

    for(let i=0;i<11;i++) {
        if(i>0 || i>9) {
            let header = document.createElement("th");
            header.innerText = i+1;
            table.appendChild(header);   
        if (i>9) {
            header.innerText = "A";
            table.appendChild(header);       
            }    
        }
        else {
            let header = document.createElement("th");    
            table.appendChild(header); 
        }      
    }
    for (let i = 10; i>0; i--) {
    let dataRow = document.createElement("tr");
    table.appendChild(dataRow);
    for (let j=0; j<10;j++) { 
            if (j ==0) {
                let heading = document.createElement("th");
                heading.innerText = `${i+7}`;
                dataRow.appendChild(heading);
            }
            if (j ==9) {
                let dataCell = document.createElement("td");
                dataCell.innerText ="0/0";
                dataCell.classList.add(`${char}${i+7}/A`);
                dataRow.appendChild(dataCell);
            }
            else {
                let dataCell = document.createElement("td");
                dataCell.innerText ="0/0";
                dataCell.classList.add(`${char}${i+7}/${j+2}`);
                dataRow.appendChild(dataCell);
            }
        }
    }

    let hitTableTd = table.querySelectorAll("td");
    hitTableTd.forEach(td => {
        let storageString = localStorage.getItem(`${td.className}`);
        if(storageString !==null) {
        td.innerText=storageString;
        }
    });
}

function homePage() {
    window.location.href ="../index.html";
}
createTable(standingBox, "S");
createTable(hittingBox, "H");
