const scores = [];
for(let i=0;i<3;i++) {
    let testScore = prompt(`Enter Test Score`);
    testScore =parseFloat(testScore);
    scores.push(testScore);
}
let averageScore= average(scores);
Grade(averageScore);



function average(arr) {
    let sum =0;
    for(let i=0;i<arr.length;i++) {
        sum+=arr[i];
    }
    let average = sum/arr.length;
    console.log(`Average Score: ${average}`);
    return average;
}

function Grade(average) {
    switch(true) {
        case (average>=90):
            console.log("Average is A")
            break;
        case (average>=80):
            console.log("Average is B")
            break;
        case (average>=70):
            console.log("Average is C")
            break;
        case (average>=65):
            console.log("Average is D")
            break;
        default:
            console.log("Average is F")
            break;
    }
}

