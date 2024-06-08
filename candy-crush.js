const candies = ['Red', 'Yellow', 'Purple', 'Orange', 'Blue', 'Green'];

let board = [];
const row = 9;
const column = 9;
let score = 0;

let thisTile;
let otherTile;

window.onload = function () {
    startGame();

    window.setInterval(function () {
        crushCandy();
        slideCandy();
        generateCandy();
    },100);

}

function startGame() {
    for (let i = 0; i < row; i++) {
        let row = [];
        for (let j = 0; j < column; j++) {
            let tile = document.createElement("img");
            tile.id = `${i}-${j}`;
            tile.src = `./images/${randomCandy()}.png`;
            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById('js-gameplay-area').append(tile);
            row.push(tile);
        }
        board.push(row);
    }


}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function dragStart() {
    thisTile = this;
}
function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
}
function dragLeave() {

}
function dragDrop() {
    otherTile = this;
}
function dragEnd() {
    if (thisTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    const thisTilecoOrd = thisTile.id.split("-");
    const r1 = parseInt(thisTilecoOrd[0]);
    const c1 = parseInt(thisTilecoOrd[1]);

    const otherTilecoOrd = otherTile.id.split("-");
    const r2 = parseInt(otherTilecoOrd[0]);
    const c2 = parseInt(otherTilecoOrd[1]);

    const upMove = r1 == (r2 + 1) && c1 == c2;
    const downMove = r1 == (r2 - 1) && c1 == c2;
    const leftMove = r1 == r2 && c1 == (c2 + 1);
    const rightMove = r1 == r2 && c1 == (c2 - 1);

    const isAdjacent = upMove || downMove || leftMove || rightMove;

    if (isAdjacent) {
        let currImg = thisTile.src;
        let otherImg = otherTile.src;
        thisTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = isValid();
        if (!validMove) {
            let currImg = thisTile.src;
            let otherImg = otherTile.src;
            thisTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
}


function isValid() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column - 2; j++) {
            let candy1 = board[i][j];
            let candy2 = board[i][j + 1];
            let candy3 = board[i][j + 2];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    for (let j = 0; j < column; j++) {
        for (let i = 0; i < row - 2; i++) {
            let candy1 = board[i][j];
            let candy2 = board[i + 1][j];
            let candy3 = board[i + 2][j];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    return false;
}

function crushCandy() {
    crushThree();
    document.querySelector('.js-score').innerHTML = `<p>Score : ${score}<p>`;
}

function crushThree() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column - 2; j++) {
            let candy1 = board[i][j];
            let candy2 = board[i][j + 1];
            let candy3 = board[i][j + 2];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
    for (let j = 0; j < column; j++) {
        for (let i = 0; i < row - 2; i++) {
            let candy1 = board[i][j];
            let candy2 = board[i + 1][j];
            let candy3 = board[i + 2][j];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 30;
            }
        }
    }
}

function slideCandy()
{
    for (let c = 0; c < column; c++) {
        let ind = row - 1;
        for (let r = column-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }

        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png";
        }
    }
}

function generateCandy() {
    for (let c = 0; c < column;  c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}