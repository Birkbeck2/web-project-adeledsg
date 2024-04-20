// 3*3 puzzle grid

let puzzleContainer = document.getElementById("puzzle-container");

function creatingGrid() { //3*3 puzzle
    let rows = 3;
    let columns = 3;

    for(let i=0; i<rows*columns; i++){
        let pieceDiv = document.createElement('div')
        pieceDiv.className = "piece2";
        puzzleContainer.appendChild(pieceDiv);
        let img = document.createElement("img");
        img.className = "images";
        img.id = `image${i}`;
        img.setAttribute("draggable", "true"); 
        pieceDiv.appendChild(img);
    }
}
creatingGrid();

//Adding images

let img0 = document.getElementById("image0");
img0.src = "puzzle2/Piece1.png"; 
img0.width = "679";
img0.height = "700";
img0.alt = "puzzle piece 1"

let img1 = document.getElementById("image1");
img1.src = "puzzle2/Piece2.png"; 
img1.width = "610";
img1.height = "704";
img1.alt = "puzzle piece 2"

let img2 = document.getElementById("image2");
img2.src = "puzzle2/Piece3.png"; 
img2.width = "703";
img2.height = "693";
img2.alt = "puzzle piece 3"

let img3 = document.getElementById("image3");
img3.src = "puzzle2/Piece4.png"; 
img3.width = "698";
img3.height = "610";
img3.alt = "puzzle piece 4"

let img4 = document.getElementById("image4");
img4.src = "puzzle2/Piece5.png"; 
img4.width = "610";
img4.height = "610";
img4.alt = "puzzle piece 5"

let img5 = document.getElementById("image5");
img5.src = "puzzle2/Piece6.png"; 
img5.width = "700";
img5.height = "610";
img5.alt = "puzzle piece 6"

let img6 = document.getElementById("image6");
img6.src = "puzzle2/Piece7.png"; 
img6.width = "701";
img6.height = "702";
img6.alt = "puzzle piece 7"

let img7 = document.getElementById("image7");
img7.src = "puzzle2/Piece8.png"; 
img7.width = "612";
img7.height = "685";
img7.alt = "puzzle piece 8"

let img8 = document.getElementById("image8");
img8.src = "puzzle2/Piece9.png"; 
img8.width = "700";
img8.height = "703";
img8.alt = "puzzle piece 9"

//Adding drop zones and unique Ids to all divs 

function creatingDropZones() { 
    let rows = 3;
    let columns = 3;

    for(let i=0; i<rows*columns; i++){
        let dropZone = document.createElement('div')
        dropZone.className = "drop-zone2";
        puzzleContainer.appendChild(dropZone);
    }
}
creatingDropZones();

let dropZone = document.getElementsByClassName("drop-zone2");

Array.from(dropZone).forEach(function(dropZone, i){
    dropZone.id = `droping-${i}`; 
});

let pieceDiv = document.getElementsByClassName("piece2");

Array.from(pieceDiv).forEach(function(pieceDiv, i){
    pieceDiv.id = `dragging-${i}`;
});

//Start and Reset Button
let pieceContainer = document.getElementById("piece-container");

document.addEventListener('DOMContentLoaded', function () {
    let startButton = document.getElementById('start');
    let resetButton = document.getElementById('reset');

    startButton.addEventListener('click', function(e){
        startButton.style.display = 'none';
        resetButton.style.display = 'flex'; 
       
        Array.from(dropZone).forEach(function(zone){
            zone.style.border = "1px solid black";
       });

        let pieces = document.getElementsByClassName("piece2");
        let element = e.target; 
        e.preventDefault();

        Array.from(pieces).forEach(function(piece){ 
            let leftPosition = Math.floor(Math.random()*60);
            let topPosition = Math.floor(Math.random()*60);
            piece.style.position = "absolute";
            piece.style.left = `${leftPosition}%`;
            piece.style.top = `${topPosition}%`
            pieceContainer.appendChild(piece);
        });
    });

    resetButton.addEventListener('click', function(e) {
        resetButton.style.display = 'none';
        startButton.style.display = 'flex';
        let element = e.target;
        window.location.reload(); 
    });
});

//Drag/touch events

let draggableImages = document.getElementsByClassName("images");
var globalDraggedItemId = null;

function handleStart(e) {
    e.stopPropagation();
    if (e.type === 'dragstart') {
        console.log(e);
        e.dataTransfer.setData('text/plain', e.currentTarget.id); 
    } 
    if (e.type === 'touchstart') { 
        e.preventDefault();
    }
    globalDraggedItemId = e.currentTarget.id; 
}

function handleOverMove(e){ 
    e.preventDefault();
    e.stopPropagation();
    let draggedImage = e.currentTarget;
    draggedImage.style.zIndex = 1000;  
    let originalContainer = draggedImage.parentElement;
    originalContainer.style.zIndex = 1; 
}

function handleDropEnd(e) { 
    e.preventDefault();
    e.stopPropagation();

    let draggedItem;
    let targetContainer = e.currentTarget;

    if (targetContainer.querySelector('img')){ 

    } else {
        if (e.type === 'drop') {
            let data = e.dataTransfer.getData("text/plain"); 
            draggedItem = document.getElementById(data); 
        } else if (e.type === 'touchend') {
            draggedItem = document.getElementById(globalDraggedItemId); 
        }
        if (draggedItem) {
            e.currentTarget.appendChild(draggedItem);
            globalDraggedItemId = null; 
        }
    
        checkPosition();

    }
}

Array.from(draggableImages).forEach(function(image){
    image.addEventListener('dragstart', handleStart);
    image.addEventListener('touchstart', handleStart);
});

Array.from(dropZone).forEach(function(zone){ 
    zone.addEventListener('dragover', handleOverMove);
    zone.addEventListener('touchmove', handleOverMove);
    zone.addEventListener('drop', handleDropEnd);
    zone.addEventListener('touchend', handleDropEnd);
});


//Alert message when puzzle completed
let correctPosition = {
    image0: "droping-0",
    image1: "droping-1",
    image2: "droping-2",
    image3: "droping-3",
    image4: "droping-4",
    image5: "droping-5",
    image6: "droping-6",
    image7: "droping-7",
    image8: "droping-8",
};

function checkPosition() {
    let allPlaced = true;
    let allCorrect = true;

    for (let [imgId, dropId] of Object.entries(correctPosition)) {
        let image = document.getElementById(imgId);
        let currentDrop = image.parentElement.id;

       if (!image.parentElement || !image.parentElement.classList.contains('drop-zone2')) {
        allPlaced = false;
        }

        if (currentDrop !== dropId) {
        allCorrect = false;
        }
    }

    if (allPlaced && !allCorrect) {
        setTimeout(() => {
            alert("You are almost there! But some pieces are in the wrong place.");
        }, 500);
    } else if (allPlaced && allCorrect) {
        Array.from(dropZone).forEach(function(drop){
            drop.style.border = "none";
        })
        setTimeout(() => {
            alert("Congratulations! You completed the puzzle.");
        }, 500);
    }

    return true;
}
