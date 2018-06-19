var canvas = document.getElementById("myCanvas");
var width = canvas.width;
var height = canvas.height;
const lbs2kilo = 0.453592;
var barbellWeight;
var collarWeight;
var totalWeight;
var ctx = canvas.getContext("2d");
var button = document.getElementById("load");
var barbellText = document.getElementById("barbellText");
var collarText = document.getElementById("collarText");
var totalText = document.getElementById("totalText");
var barbellUnit = document.getElementById("barbellUnit");
var collarUnit = document.getElementById("collarUnit");
var totalUnit = document.getElementById("totalUnit");
var weightLabel = document.getElementById("curWeight");

button.onclick = function() {
    barbellWeight = parseWeight(barbellText, barbellUnit);
    collarWeight = parseWeight(collarText, collarUnit);
    totalWeight = parseWeight(totalText, totalUnit);

    if (barbellWeight+collarWeight > totalWeight) {
        alert("Error, weight of barbell and collars cannot exceed total weight");
    }
    else {
        numPlates(totalWeight-barbellWeight-(2*collarWeight));
    }
}

function parseWeight(text, unit) {
    var weight = parseFloat(text.value);
    if(text.value.length == 0) {
        text.value = 0;
        weight = 0;
    }

    if(unit.value == "lb") {
        weight = weight * lbs2kilo;
    }
    return weight;
}

function numPlates(weight) {
    //remaining wieght rounded to nearest 2.5kg
    var remWeight = Math.round(weight/2.5)*2.5;
    var curWeightKilo = remWeight+barbellWeight+(2*collarWeight);
    const curWeightPound = Math.round((curWeightKilo/lbs2kilo)*10)/10;
    curWeightKilo = Math.round(curWeightKilo*10)/10;
    var redPlates, bluePlates, yellowPlates, greenPlates, whitePlates, blackPlates, silverPlates;
    redPlates = bluePlates = yellowPlates = greenPlates = whitePlates = blackPlates = silverPlates = 0;
    while(remWeight-50 >= 0) {
        redPlates += 1
        remWeight -= 50
    }
    if(remWeight-40 >= 0) {
        bluePlates += 1
        remWeight -= 40
    }
    if(remWeight-30 >= 0) {
        yellowPlates += 1
        remWeight -= 30
    }
    if(remWeight-20 >= 0) {
        greenPlates += 1
        remWeight -= 20
    }
    if(remWeight-10 >= 0) {
        whitePlates += 1
        remWeight -= 10
    }
    if(remWeight-5 >= 0) {
        blackPlates += 1
        remWeight -= 5
    }
    if(remWeight-2.5 >= 0) {
        silverPlates += 1
        remWeight -= 2.5
    }

    weightLabel.innerText = curWeightPound + " lbs / " + curWeightKilo + " kg";
    drawPlates(redPlates, bluePlates, yellowPlates, greenPlates, whitePlates, blackPlates, silverPlates);
}

function drawPlates(redPlates, bluePlates, yellowPlates, greenPlates, whitePlates, blackPlates, silverPlates) {
    var plateCoord = startPos(redPlates, bluePlates, yellowPlates, greenPlates, whitePlates, blackPlates, silverPlates);
    ctx.clearRect(0, 0, width, height);
    
    //draw red plates
    while(redPlates > 0) {
        ctx.fillStyle = 'rgb(171, 55, 58)';
        ctx.roundRect(plateCoord, 0, height*0.12, height, 3).fill();
        redPlates--;
        plateCoord += ((height*0.12)+(height*0.01));
    }
    //draw blue plates
    while(bluePlates > 0) {
        ctx.fillStyle = 'rgb(26, 118, 188)';
        ctx.roundRect(plateCoord, 0, height*0.1, height, 2.5).fill();
        bluePlates--;
        plateCoord += ((height*0.1)+(height*0.01));
    }
    //draw yellow plates
    while(yellowPlates > 0) {
        ctx.fillStyle = 'rgb(210, 178, 64)';
        ctx.roundRect(plateCoord, (1/18)*height, (height*0.09333), (8/9)*height, 2.33325).fill();
        yellowPlates--;
        plateCoord += ((height*0.09333)+(height*0.01));
    }
    //draw green plates
    while(greenPlates > 0) {
        ctx.fillStyle = 'rgb(70, 138, 37)';
        ctx.roundRect(plateCoord, (5/36)*height, (height*0.09333), (13/18)*height, 2.33325).fill();
        greenPlates--;
        plateCoord += ((height*0.09333)+(height*0.01));
    }
    //draw white plates
    while(whitePlates > 0) {
        ctx.fillStyle = 'rgb(245, 244, 247)';
        ctx.roundRect(plateCoord, (37/150)*height, (height*0.09556), (38/75)*height, 2.38889).fill();
        whitePlates--;
        plateCoord += ((height*0.09556)+(height*0.01));
    }
    //draw black plates
    while(blackPlates > 0) {
        ctx.fillStyle = 'rgb(24, 24, 24)';
        ctx.roundRect(plateCoord, (26/90)*height, (height*0.07111), (19/45)*height, 1.77778).fill();
        blackPlates--;
        plateCoord += ((height*0.07111)+(height*0.01));
    }
    //draw silver plates
    while(silverPlates > 0) {
        ctx.fillStyle = 'rgb(131, 139, 138)';
        ctx.roundRect(plateCoord, (29/90)*height, (height*0.05333), (16/45)*height, 1.33333).fill();
        silverPlates--;
        plateCoord += ((height*0.05333)+(height*0.01));
    }
}

function startPos(redPlates, bluePlates, yellowPlates, greenPlates, whitePlates, blackPlates, silverPlates) {
    var totalWidth = 0;
    
    while(redPlates > 0) {
        totalWidth += ((height*0.12)+(height*0.01));
        redPlates--;
    }
    while(bluePlates > 0) {
        totalWidth += ((height*0.1)+(height*0.01));
        bluePlates--;
    }
    while(yellowPlates > 0) {
        totalWidth += ((height*0.09333)+(height*0.01));
        yellowPlates--;
    }
    while(greenPlates > 0) {
        totalWidth += ((height*0.09333)+(height*0.01));
        greenPlates--;
    }
    while(whitePlates > 0) {
        totalWidth += ((height*0.09556)+(height*0.01));
        whitePlates--;
    }
    while(blackPlates > 0) {
        totalWidth += ((height*0.07111)+(height*0.01));
        blackPlates--;
    }
    while(silverPlates > 0) {
        totalWidth += ((height*0.05333)+(height*0.01));
        silverPlates--;
    }

    return (width/2)-(totalWidth/2);
}

//draw rounded rectangle
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x+r, y);
    this.arcTo(x+w, y,   x+w, y+h, r);
    this.arcTo(x+w, y+h, x,   y+h, r);
    this.arcTo(x,   y+h, x,   y,   r);
    this.arcTo(x,   y,   x+w, y,   r);
    this.closePath();
    return this;
}