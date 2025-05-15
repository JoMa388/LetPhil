const students =[];


// Add Student Function 
function addStudents(name,grade) {
    students.push({
        name,
        grade,
    });
}
// Remove Student Function
function removeStudent(name) {
    const index = students.findIndex(student=> student.name);
    if(index!==-1){
        students.splice(index,1)
        console.log(`${name} has been removed`);
    }
    else {
        console.log(`${name} was not found`);
    }
}

// Filter Student Function

function filterStudent(grade){
    return students.filter((student) => student.grade >= grade);
} 

// Map Student Function 

function formatStudentList() {
    return students.map(students =>`${students.name} - Grade: ${students.grade}`);
}

addStudents("Alice", 90);
addStudents("John", 80);
addStudents("Steve", 50);
addStudents("David", 60);
addStudents("Joe", 70);
console.log(students);
console.log(formatStudentList());
removeStudent("John");
console.log(students);
console.log(filterStudent(80));
