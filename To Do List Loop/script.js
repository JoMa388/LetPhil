const tasks = [];

while(true) {
    let task = prompt("Enter a Task, type done to finish");

    if (task.toLowerCase()==="done") {
        break;
    }

    tasks.push(task);
}

console.log("To-Do-List");
tasks.forEach((task,index)=> {
    console.log(`${index +1}. ${task}`)
})
//  Regular For loop
console.log("To-Do-List(for-loop)");
for(let i=0;i<tasks.length;i++) {
    console.log(`${i +1}. ${tasks[i]}`)
}
// For..Of Loop
console.log("To-Do-List(for of)");
for(const task of tasks) {
    console.log(`${task}`)
}

