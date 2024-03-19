
// I need to create 12 divs within puzzleContainer, each will contain a piece of the puzzle. It all has to be in order. 
// Inspired by https://www.youtube.com/watch?v=sp6Di21WVjE&t=0s&ab_channel=CryptersInfotech. Change notably the selector method and append method.

let puzzleContainer = document.getElementById("puzzle-container");

function creatingGrid() {
    let rows = 3;
    let columns = 4;

    for(let i=0; i<rows*columns; i++){
        let pieceDiv = document.createElement('div')
        pieceDiv.className = `piece${i}`;
        puzzleContainer.appendChild(pieceDiv);
    }
}
creatingGrid();

