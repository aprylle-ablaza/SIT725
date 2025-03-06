function changeText() {
    var textsArray = ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"]
    var number = getRandomNumberBetween(0, textsArray.length - 1)
 
    console.log("Index: ", number)
 
    document.getElementById("heading").innerHTML = textsArray[number];
}

function changeBackground() {
    var red = getRandomNumberBetween(0, 255);
    var green = getRandomNumberBetween(0, 255);
    var blue = getRandomNumberBetween(0, 255);
    var color = "rgb(" + red + "," + green + "," + blue + ")";
    
    console.log(color);
    var heading = document.getElementById("heading");
    heading.style.color = color;
}
 
function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function changeHeading() {
    changeText();
    changeBackground();
}