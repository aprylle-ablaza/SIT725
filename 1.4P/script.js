function changeText() {
    var textsArray = ["Text 1", "Text 2", "Text 3", "Text 4", "Text 5"]
    var number = getRandomNumberBetween(0, textsArray.length - 1)
 
    console.log("Index: ", number)
 
    document.getElementById("heading").innerHTML = textsArray[number];
}

// This function was added to supplement the code given by our tutor during the workshop and to showcase a javascript functionality that I created myself

function changeTextColor() {
    var red = getRandomNumberBetween(0, 255);
    var green = getRandomNumberBetween(0, 255);
    var blue = getRandomNumberBetween(0, 255);
    var color = "rgb(" + red + "," + green + "," + blue + ")";
    
    var heading = document.getElementById("heading");
    heading.style.color = color;
}
 
function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function changeHeading() {
    changeText();
    changeTextColor();
}