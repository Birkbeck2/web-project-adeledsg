let puzzleContainer = document.getElementById("puzzle-container");

function creatingGrid() {
    let rows = 4;
    let columns = 4;

    for(let i=0; i<rows*columns; i++){
        let pieceDiv = document.createElement('div')
        pieceDiv.className = "piece3";
        puzzleContainer.appendChild(pieceDiv); //dynamically created 4 divs with class name and nested them in puzzlecontainer.
        let img = document.createElement("img");
        img.className = "images";
        img.id = `images${i}`;
        img.setAttribute("draggable", "true"); // https://medium.com/@tatismolin/how-to-implement-drag-and-drop-functionality-using-vanilla-javascript-9ddfe2402695 
        pieceDiv.appendChild(img); //dynamically created 4  with individual id elements and nested them in the divs above.
    }
}
creatingGrid();

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
