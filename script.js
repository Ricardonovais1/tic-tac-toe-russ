// Create array to hold board data
let boardData = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

// Set variables for the game
let player = 1;
let gameOver = false;

//Start counting each player's score:
let count1 = 0;
let count2 = 0;


// Pull in cells from DOM
const cellElements = document.querySelectorAll('.cell');

const clickedCells = [];

// Add event listener

cellElements.forEach((cell, index) => {
    cell.addEventListener('click', (e) => {
        placeMarker(index)
    });
});

// Create function for placing markers
function placeMarker(index) {
    // Determine rows and columns from index
    let col = index % 3
    let row = (index - col) / 3

    // Check if current cell is empty

    if (boardData[row][col] === 0 && gameOver == false) {
        boardData[row][col] = player;

        // Define second player 
        player *= -1;
        // Update the screen with markers
        drawMarkers();
        // Check if anyone has won
        checkResult();
    }
}

// Create function for drawing markers

function drawMarkers() {
    // Iterate over rows
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (boardData[row][col] == 1) {
                cellElements[(row * 3) + col].classList.add('cross')
            } else if (boardData[row][col] ==  -1) {
                cellElements[(row * 3) + col].classList.add('circle')
            }
        }
    }
}

// Create function to check result

function checkResult() {
    //Check rows and columns
    for (let i = 0; i < 3; i++) {
        let rowSum = boardData[i][0] + boardData[i][1] + boardData[i][2];
        let colSum = boardData[0][i] + boardData[1][i] + boardData[2][i];
        
        if (rowSum == 3 || colSum == 3) {
            // Player 1 wins 
            endGame(1)
            return
            console.log('Player 1 wins')

        } else if (rowSum == -3 || colSum == -3) {
            // Player 2 wins
            endGame(2)
            return
            console.log('Player 2 wins')
        }
    }
    let diagonalSum1 = boardData[0][0] + boardData[1][1] + boardData[2][2];
    let diagonalSum2 = boardData[0][2] + boardData[1][1] + boardData[2][0];
    if (diagonalSum1 == 3 || diagonalSum2 == 3) {
        // Player 1 wins 
        endGame(1)
        return

        console.log('Player 1 wins')

    } else if (diagonalSum1 == -3 || diagonalSum2 == -3) {
        // Player 2 wins
        endGame(2)
        return

        console.log('Player 2 wins')
    }
    // Check for a tie
    if (boardData[0].indexOf(0) == -1 &&
        boardData[1].indexOf(0) == -1 &&
        boardData[2].indexOf(0) == -1) {
            console.log("That's a Draw")
            endGame(0)
            return

        }
}

// Function to end the game and show result
function endGame(winner) {

    gameOver = true
    const resultElement = document.getElementById('result');
    

    if (winner == 0) {
        resultElement.textContent = "Tie"
        restartButton.classList.remove('not-show');
    } else {
        resultElement.textContent = `Player ${winner} wins!`
        restartButton.classList.remove('not-show');
        

        if (winner == 1) {
           count1++
           
           gameScore(count1, count2)
        }
        if (winner == 2) {
            count2++
            
           gameScore(count1, count2)
        }
    }
}

const restartButton = document.getElementById('restart')
restartButton.addEventListener('click', () => {
    boardData = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    
    player = 1;
    gameOver = false;

    cellElements.forEach(cell => {
        cell.classList.remove('circle')
        cell.classList.remove('cross')
    });

    restartButton.classList.add('not-show')
    document.getElementById('result').textContent = '';
})


const score1 = document.querySelector('.score1');
const score2 = document.querySelector('.score2');

function gameScore(count1, count2) {
         
    score1.textContent = count1;
    score2.textContent = count2;
        
}

