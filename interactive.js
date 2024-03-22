
// I need to create 12 divs within puzzleContainer, each will contain a piece of the puzzle. It all has to be in order. 
// Inspired by https://www.youtube.com/watch?v=sp6Di21WVjE&t=0s&ab_channel=CryptersInfotech. Change notably the selector method and append method.

let puzzleContainer = document.getElementById("puzzle-container");

function creatingGrid() {
    let rows = 2;
    let columns = 2;

    for(let i=0; i<rows*columns; i++){
        let pieceDiv = document.createElement('div')
        pieceDiv.className = `piece${i}`;
        puzzleContainer.appendChild(pieceDiv);
        let img = document.createElement("img");
        img.id = `img${i}`;
        pieceDiv.appendChild(img);
    }
}
creatingGrid();

let img0 = document.getElementById("img0");
img0.src = "puzzle/Picture1.png"; 

let img1 = document.getElementById("img1");
img1.src = "puzzle/Picture2.png"; 

let img2 = document.getElementById("img2");
img2.src = "puzzle/Picture3.png"; 

let img3 = document.getElementById("img3");
img3.src = "puzzle/Picture4.png"; 
