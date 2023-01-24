var rows = 5; //dédicacé a Polymanu pour sa patience et son aide précieuse ! Je t'aime <3 Héhé VIVE LES BRIQUES ! n_n o/ mdr tu me feras un dessin de brique ? :D
var columns = 13;
var brickWidth = 50;
var brickHeight = 20;
var bricks = [];

for (var r = 0; r < rows; r++) {
    for (var c = 0; c < columns; c++) {
        bricks.push({
            color: "red",
            x: c * (brickWidth + 10) + 10,
            y: r * (brickHeight + 10) + 50,
            width: brickWidth,
            height: brickHeight,
            visible: true,
            durability: Math.floor(Math.random() * 3) + 1 
        });
    }
}