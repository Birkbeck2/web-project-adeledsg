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

//II. Adding event listeners to start and reset buttons
let pieceContainer = document.getElementById("piece-container");

document.addEventListener('DOMContentLoaded', function () { // Assuring page is loaded
    let startButton = document.getElementById('start');
    let resetButton = document.getElementById('reset');

    // Event listener for the start button
    startButton.addEventListener('click', function(e){
        startButton.style.display = 'none'; // Hiding the start button
        resetButton.style.display = 'flex'; // Showing the reset button
        let element = e.target; //moving pieces (div which include their nested img) currently in Puzzle container to Piece container on click event for start button.
        e.preventDefault();
        let pieces = document.getElementsByClassName("piece");
        Array.from(pieces).forEach(function(piece){ //Find source for this line of code. Iterating through my piece divs.
            let leftPosition = Math.floor(Math.random()*10); //giving them random position (need to change to make sure they are properly contained)
            let topPosition = Math.floor(Math.random()*100);
            piece.style.position = "absolute";
            piece.style.left = `${leftPosition}%`;
            piece.style.top = `${topPosition}%`
            piece.setAttribute("draggable", "true"); // https://medium.com/@tatismolin/how-to-implement-drag-and-drop-functionality-using-vanilla-javascript-9ddfe2402695
            pieceContainer.appendChild(piece);
        });
        toggleOrder();
    });

    // Event listener for the reset button
    resetButton.addEventListener('click', function(e) {
        resetButton.style.display = 'none'; // Hiding the reset button
        startButton.style.display = 'flex'; // Showing the start button
        let element = e.target;
        e.preventDefault();
        let pieces = document.getElementsByClassName("piece");
        Array.from(pieces).forEach(function(piece){
            piece.style.removeProperty('left'); 
            piece.style.removeProperty('top');
            piece.style.removeProperty('position');
            puzzleContainer.appendChild(piece);
        });
    });
});

function toggleOrder() { //I needed a function that modify the order of the div piece and div dropzone. Indeed, when clicking start, the piece would move and when reset will be visually below the dropzone div that are created below.
    let pieces = document.getElementsByClassName('piece');
    let dropZones = document.getElementsByClassName('drop-zone');
    Array.from(pieces).forEach(piece => piece.style.order = '1');
    Array.from(dropZones).forEach(dropZone => dropZone.style.order = '2');
}

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
Each take either drag or touch event as a firt parameter along with calling the appropriate function that will handle their common logic and account for their differences.*/
let draggablePiece = document.getElementsByClassName("piece");
var globalDraggedItemId = null; // set data and get data are methods that do not exist for touch events. Creating global variable to maintain state.

function handleStart(e) {
    if (e.type === 'dragstart') {
        console.log(e);
        e.dataTransfer.setData('text/plain', e.target.id); //Seeting the data to add id to my target element that is my div and retriving it in drop- source: https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
    } 
    if (e.type === 'touchstart') { 
        e.preventDefault(); 
    }
    globalDraggedItemId = e.target.id; // setting data
}

function handleOverMove(e){ 
    e.preventDefault();
}

function handleDropEnd(e) { 
    e.preventDefault();
    let draggedItem;
    if (e.type === 'drop') {
        let data = e.dataTransfer.getData("text/plain"); //retrieving id and moving it the div to target. 
        draggedItem = document.getElementById(data); 
    } else if (e.type === 'touchend') {
        draggedItem = document.getElementById(globalDraggedItemId); 
    }
    if (draggedItem) {
        e.currentTarget.appendChild(draggedItem);
        globalDraggedItemId = null; // Reset the global variable
    }

    checkPosition(); //calling function for alert messages below
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

// V. Finish message
let correctPosition = { // creating an object using individual ids created earlier.
    img0: "drop-0",
    img1: "drop-1",
    img2: "drop-2",
    img3: "drop-3",
};

function checkPosition() {
    let allPlaced = true;
    let allCorrect = true;

    for (let [imgId, dropId] of Object.entries(correctPosition)) { //iterating through my object that contains the correct positions of each piece.
        let image = document.getElementById(imgId);
        let currentDrop = image.parentElement.id;

       // Checking if piece are placed or not in the drop zone divs
       if (!image.parentElement || !image.parentElement.classList.contains('drop-zone')) {
        allPlaced = false;
        }

        // Checking if the images' parents' id are that of the dropzone id = aka they are they correctly placed
        if (currentDrop !== dropId) {
        allCorrect = false;
        }
    }

    if (allPlaced && !allCorrect) {// All pieces are placed, but some are wrong
        setTimeout(() => {
            alert("You are almost there! But some pieces are in the wrong place.");
        }, 500); // Delay to allow for the puzzle to be visually completed before showing the message/
    } else if (allPlaced && allCorrect) { // All pieces are placed correctly
        setTimeout(() => {
            alert("Congratulations! You completed the puzzle.");
        }, 500);
    }

    return true;
}

// VI. Allowing user mistakes and going back