// Inspired by https://www.youtube.com/watch?v=sp6Di21WVjE&t=0s&ab_channel=CryptersInfotech.

// I. Dynamically creating 4 div (box for the pieces) within my Puzzle container and then the img element within each div.
let puzzleContainer = document.getElementById("puzzle-container");

function creatingGrid() {
    let rows = 2;
    let columns = 2;

    for(let i=0; i<rows*columns; i++){
        let pieceDiv = document.createElement('div')
        pieceDiv.className = "piece";
        puzzleContainer.appendChild(pieceDiv); //dynamically created 4 divs with class name and nested them in puzzlecontainer.
        let img = document.createElement("img");
        img.id = `img${i}`;
        pieceDiv.appendChild(img); //dynamically created 4  with individual id elements and nested them in the divs above.
    }
}
creatingGrid();

let img0 = document.getElementById("img0");
img0.src = "puzzle1/Picture1.png"; //adding the source for the img elements created above.

let img1 = document.getElementById("img1");
img1.src = "puzzle1/Picture2.png"; 

let img2 = document.getElementById("img2");
img2.src = "puzzle1/Picture3.png"; 

let img3 = document.getElementById("img3");
img3.src = "puzzle1/Picture4.png"; 

//II. Adding event listener: moving pieces (div which include their nested img) currently in Puzzle container to Piece container on click event.
let startButton = document.getElementById("start");
let pieceContainer = document.getElementById("piece-container");

startButton.addEventListener("click", function(e){ // click event for touch, mouse and keyboard users: https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
    let element = e.target;
    e.preventDefault();
    let pieces = document.getElementsByClassName("piece");
    Array.from(pieces).forEach(function(piece){ //Find source for this line of code
        let leftPosition = Math.floor(Math.random()*100); //giving them random position (need to change to make sure they are properly contained)
        let topPosition = Math.floor(Math.random()*100);
        piece.style.position = "absolute";
        piece.style.left = `${leftPosition}%`;
        piece.style.top = `${topPosition}%`
        piece.setAttribute("draggable", "true"); // https://medium.com/@tatismolin/how-to-implement-drag-and-drop-functionality-using-vanilla-javascript-9ddfe2402695
        pieceContainer.appendChild(piece);
    });
})


//III. After adding the event, I realised that I needed to create new divs that will remain in the puzzle container so I can later drop the divs that have the nested img in them.
function creatingDropZones() { 
    let rows = 2;
    let columns = 2;

    for(let i=0; i<rows*columns; i++){
        let dropZone = document.createElement('div')
        dropZone.className = "drop-zone";
        puzzleContainer.appendChild(dropZone);
    }
}
creatingDropZones();


//IV. Implementing logic of the game with drag and drop events:

/* A. Creating unique ID dynamically to my drag and drop divs, to later be able to create a bolean function to match the correct place of each piece*/
let dropZone = document.getElementsByClassName("drop-zone");

Array.from(dropZone).forEach(function(dropZone, i){
    let uniqueId = `drop-${i}`;
    dropZone.id = uniqueId;
});

let pieceDiv = document.getElementsByClassName("piece");

Array.from(pieceDiv).forEach(function(pieceDiv, i){
    let uniqueId = `drag-${i}`;
    pieceDiv.id = uniqueId;
});

//B. Adding drag and drop events to the divs. Source: https://www.youtube.com/watch?v=_G8G1OrEOrI&ab_channel=DarwinTech

/*Process explained:
After programming drag and drop, I realised that it does not work for touch input, only mouse input. 
Instead I need to use touch start, move and end. As such, to make my code as clear as possible, I have created 3 functions below. 
Since event listeners can take 2 parameters, I am creating two events listeners. 
Each take either drag or touch as a firt parameter along with calling the appropriate function that will handle their common logic and account for their differences.*/
let draggablePiece = document.getElementsByClassName("piece");
var globalDraggedItemId = null;

function handleStart(e) {
    if (e.type === 'dragstart') {
        console.log(e);
        e.dataTransfer.setData('text/plain', e.target.id); //Explain here - source: https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
    } 
    if (e.type === 'touchstart') { //this does not work
        e.preventDefault(); 
    }
    globalDraggedItemId = e.target.id; 
}

function handleOverMove(e){ //this does not work
    e.preventDefault();
}

function handleDropEnd(e){ 
    if (e.type === 'drop') {
        e.preventDefault();
        let data = e.dataTransfer.getData("text/plain");
        let draggableElement = document.getElementById(data);
        e.currentTarget.appendChild(draggableElement);
    } 

    if(e.type === 'touchend'){ //this does not work
        e.preventDefault(); 
        let draggedItem = document.getElementById(globalDraggedItemId);
        dropZone.appendChild(draggedItem);
        globalDraggedItemId = null;
        }

}


Array.from(draggablePiece).forEach(function(piece){ //Iterating through each element and assigning touch and mouse event to each.
    piece.addEventListener('dragstart', handleStart);
    piece.addEventListener('touchstart', handleStart);
});

Array.from(dropZone).forEach(function(zone){ 
    zone.addEventListener('dragover', handleOverMove);
    zone.addEventListener('touchmove', handleOverMove);
    zone.addEventListener('drop', handleDropEnd);
    zone.addEventListener('touchend', handleDropEnd);
});

