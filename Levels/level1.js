function Level1(){
var rows = 5;
var columns = 13;
var brickWidth = 50;
var brickHeight = 20;
var bricks = [];

for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
        if (r == 0 || r == rows - 1 || c == 0 || c == columns - 1 ) { //il faudrait que le code soit plus clean, mais je n'ai pas le temps de le faire
            bricks.push({
                color: "red",
                x: c * (brickWidth + 10) + 10,
                y: r * (brickHeight + 10) + 50,
                width: brickWidth,
                height: brickHeight,
                visible: true,
                durability: 3
            });
        }
        else if (c == 6 || r == 2) { //il faudrait que le code soit plus clean, mais je n'ai pas le temps de le faire
            bricks.push({
                color: "red",
                x: c * (brickWidth + 10) + 10,
                y: r * (brickHeight + 10) + 50,
                width: brickWidth,
                height: brickHeight,
                visible: true,
                durability: 3
            });
        }
        else {
            bricks.push({
                color: "red",
                x: c * (brickWidth + 10) + 10,
                y: r * (brickHeight + 10) + 50,
                width: brickWidth,
                height: brickHeight,
                visible: true,
                durability: 1
            });
        }
        
    }
}
return bricks;
}


