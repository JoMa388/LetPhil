const scoreTracker = {
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
    6:0,
};

function rollDice() {
    const roll = Math.floor(Math.random() * 6) +1;
    scoreTracker[roll]++;
    console.log("roll =", roll);
}
function displayScores(){
    console.log("Dice Roll Score Tracker");
    for(const roll in scoreTracker) {
        console.log(`${roll}: ${scoreTracker[roll]} times`);
    }
}

for(let i=0; i<100; i++) {
    rollDice();
}
displayScores();
