// CS 248 Fifteen Puzzle - JavaScript Implementation
//Tommy Tran
// Used Claude AI to generate the skeleton for the shuffling alogorithm and modified as close as I 
// to understanding the specs of the project

"use strict";

(function() {
    // Private variables - encapsulated within the module
    let EMPTY_ROW = 3;
    let EMPTY_COL = 3;
    const TILE_SIZE = 100;

window.onload = function() {
    createPuzzle();
    setupShuffleButton();
};

// Create all 15 puzzle pieces dynamically
function createPuzzle() {
    const puzzleArea = document.getElementById("puzzlearea");
    
    // Create tiles in their initial positions (1-15, with 16 being empty)
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            // Skip the bottom-right position (empty space)
            if (row === 3 && col === 3) {
                continue;
            }
            
            // Calculate tile number based on position
            const tileNum = (row * 4) + col + 1;
            
            // Create the tile element
            const tile = document.createElement("div");
            tile.className = "puzzlepiece";
            tile.id = "square_" + row + "_" + col;
            tile.textContent = tileNum;
            
            // Position the tile
            tile.style.left = (col * TILE_SIZE) + "px";
            tile.style.top = (row * TILE_SIZE) + "px";
            
            // Set background position to show correct part of image
            const bgX = -(col * TILE_SIZE);
            const bgY = -(row * TILE_SIZE);
            tile.style.backgroundPosition = bgX + "px " + bgY + "px";
            
            // Add click event listener
            tile.onclick = handleTileClick;
            
            // Add to puzzle area
            puzzleArea.appendChild(tile);
        }
    }
    
    // Update movable class for all tiles
    updateMovableTiles();
}

// Handle tile click
function handleTileClick() {
    // Extract row and col from the tile's ID (format: "square_row_col")
    const id = this.id;
    const parts = id.split("_");
    const tileRow = parseInt(parts[1]);
    const tileCol = parseInt(parts[2]);
    
    // Check if this tile can move
    if (canMove(tileRow, tileCol)) {
        moveTile(this, tileRow, tileCol);
        
        // Check for win
        if (checkWin()) {
            setTimeout(function() {
                alert("Congratulations! You solved the puzzle!");
            }, 500);
        }
    }
}

function canMove(row, col) {
    const rowDiff = Math.abs(row - EMPTY_ROW);
    const colDiff = Math.abs(col - EMPTY_COL);
    
    // Adjacent means: same row and 1 column apart, OR same column and 1 row apart
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

//Checks the position of a tile and also makes sure if posible to move there
function moveTile(tileElement, fromRow, fromCol) {
    // Move tile to empty position
    tileElement.style.left = (EMPTY_COL * TILE_SIZE) + "px";
    tileElement.style.top = (EMPTY_ROW * TILE_SIZE) + "px";
    
    // Update tile's ID to reflect new position
    tileElement.id = "square_" + EMPTY_ROW + "_" + EMPTY_COL;
    
    // Update empty space location
    EMPTY_ROW = fromRow;
    EMPTY_COL = fromCol;
    
    updateMovableTiles();
}

// Update the "movable" class for all tiles based on their position
function updateMovableTiles() {
    const allTiles = document.querySelectorAll(".puzzlepiece");
    
    for (let i = 0; i < allTiles.length; i++) {
        const tile = allTiles[i];
        const id = tile.id;
        const parts = id.split("_");
        const row = parseInt(parts[1]);
        const col = parseInt(parts[2]);
        
        // Add or remove "movable" class based on whether tile can move
        if (canMove(row, col)) {
            tile.classList.add("movable");
        } else {
            tile.classList.remove("movable");
        }
    }
}

function setupShuffleButton() {
    const shuffleBtn = document.getElementById("shufflebutton");
    shuffleBtn.onclick = shufflePuzzle;
}

// Shuffle the puzzle by making 1000 random valid moves
function shufflePuzzle() {
    for (let i = 0; i < 1000; i++) {
        const movableTiles = getMovableTiles();
        const randomIndex = parseInt(Math.random() * movableTiles.length);
        const randomTile = movableTiles[randomIndex];
        
        // Extract position from tile ID
        const parts = randomTile.id.split("_");
        const row = parseInt(parts[1]);
        const col = parseInt(parts[2]);
        
        moveTile(randomTile, row, col);
    }
}

// Get all tiles that can currently move
function getMovableTiles() {
    const movableTiles = [];
    const allTiles = document.querySelectorAll(".puzzlepiece");
    
    for (let i = 0; i < allTiles.length; i++) {
        const tile = allTiles[i];
        const parts = tile.id.split("_");
        const row = parseInt(parts[1]);
        const col = parseInt(parts[2]);
        
        if (canMove(row, col)) {
            movableTiles.push(tile);
        }
    } 
    return movableTiles;
}

// Check if puzzle is solved
function checkWin() {
    // Check if all tiles are in their correct positions
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            // Empty space should be at bottom-right
            if (row === 3 && col === 3) {
                if (EMPTY_ROW !== 3 || EMPTY_COL !== 3) {
                    return false;
                }
                continue;
            }
            
            // Get the tile that should be at this position
            const expectedNum = (row * 4) + col + 1;
            const tileId = "square_" + row + "_" + col;
            const tile = document.getElementById(tileId);
            
            // If tile doesn't exist at this position, puzzle not solved
            if (!tile) {
                return false;
            }
            
            // Check if tile has correct number
            if (parseInt(tile.textContent) !== expectedNum) {
                return false;
            }
        }
    }
    
    return true;
}
})();