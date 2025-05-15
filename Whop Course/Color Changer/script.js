const button = document.getElementById("colorButton");
const reset = document.getElementById ("resetButton");

button.addEventListener("click", function() {
    const randomColor =getRandomRGB();
    document.body.style.backgroundColor = randomColor;
})

reset.addEventListener("click",function() {
    document.body.style.backgroundColor = "white";
})
function getRandomRGB() {
    const r = Math.floor(Math.random() * 256); // Red: 0–255
    const g = Math.floor(Math.random() * 256); // Green: 0–255
    const b = Math.floor(Math.random() * 256); // Blue: 0–255
    return `rgb(${r}, ${g}, ${b})`;
}
