// 4*4 puzzle grid

let puzzleContainer = document.getElementById("puzzle-container");

function creatingGrid() { //4*4 puzzle
    let rows = 4;
    let columns = 4;

    for(let i=0; i<rows*columns; i++){
        let pieceDiv = document.createElement('div')
        pieceDiv.className = "piece3";
        puzzleContainer.appendChild(pieceDiv); 
        let img = document.createElement("img");
        img.className = "images";
        img.id = `images${i}`;
        img.setAttribute("draggable", "true"); 
        pieceDiv.appendChild(img); 
    }
}
creatingGrid();

//Adding images

let img0 = document.getElementById("images0");
img0.src = "puzzle3/piece1.png"; 

let img1 = document.getElementById("images1");
img1.src = "puzzle3/piece2.png"; 

let img2 = document.getElementById("images2");
img2.src = "puzzle3/piece3.png"; 

let img3 = document.getElementById("images3");
img3.src = "puzzle3/piece4.png"; 

let img4 = document.getElementById("images4");
img4.src = "puzzle3/piece5.png";  

let img5 = document.getElementById("images5");
img5.src = "puzzle3/piece6.png"; 

let img6 = document.getElementById("images6");
img6.src = "puzzle3/piece7.png";  

let img7 = document.getElementById("images7");
img7.src = "puzzle3/piece8.png"; 

let img8 = document.getElementById("images8");
img8.src = "puzzle3/piece9.png"; 

let img9 = document.getElementById("images9");
img9.src = "puzzle3/piece10.png"; 

let img10 = document.getElementById("images10");
img10.src = "puzzle3/piece11.png"; 

let img11 = document.getElementById("images11");
img11.src = "puzzle3/piece12.png"; 

let img12 = document.getElementById("images12");
img12.src = "puzzle3/piece13.png"; 

let img13 = document.getElementById("images13");
img13.src = "puzzle3/piece14.png"; 

let img14 = document.getElementById("images14");
img14.src = "puzzle3/piece15.png"; 

let img15 = document.getElementById("images15");
img15.src = "puzzle3/piece16.png"; 

//Adding drop zones and unique Ids to all divs 

function creatingDropZones() { 
    let rows = 4;
    let columns = 4;

    for(let i=0; i<rows*columns; i++){
        let dropZone = document.createElement('div')
        dropZone.className = "drop-zone3";
        puzzleContainer.appendChild(dropZone);
    }
}
creatingDropZones();

let dropZone = document.getElementsByClassName("drop-zone3");

Array.from(dropZone).forEach(function(dropZone, i){
    dropZone.id = `zone-${i}`; 
});

let pieceDiv = document.getElementsByClassName("piece3");

Array.from(pieceDiv).forEach(function(pieceDiv, i){
    pieceDiv.id = `dragzone-${i}`;
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

        let pieces = document.getElementsByClassName("piece3");
        let element = e.target; 
        e.preventDefault();
        
        Array.from(pieces).forEach(function(piece){
            let leftPosition = Math.floor(Math.random()*50);
            let topPosition = Math.floor(Math.random()*50);
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
    images0: "zone-0",
    images1: "zone-1",
    images2: "zone-2",
    images3: "zone-3",
    images4: "zone-4",
    images5: "zone-5",
    images6: "zone-6",
    images7: "zone-7",
    images8: "zone-8",
    images9: "zone-9",
    images10: "zone-10",
    images11: "zone-11",
    images12: "zone-12",
    images13: "zone-13",
    images14: "zone-14",
    images15: "zone-15",
};

function checkPosition() {
    let allPlaced = true;
    let allCorrect = true;

    for (let [imgId, dropId] of Object.entries(correctPosition)) {
        let image = document.getElementById(imgId);
        let currentDrop = image.parentElement.id;

       if (!image.parentElement || !image.parentElement.classList.contains('drop-zone3')) {
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
        Array.from(dropZone).forEach(function(drop){ //purely aesthetics considerations, otherwise, we would see the borders
            drop.style.border = "none";
        })
        setTimeout(() => {
            alert("Congratulations! You completed the puzzle.");
        }, 500);
    }

    return true;
}