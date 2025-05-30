document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById("sudoku-board");
    const checkButton = document.getElementById("check-btn");
    const message = document.getElementById("message");

    const puzzle = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];

    
    let cells = [];

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement("input");
            cell.type = "text";
            cell.maxLength = 1;
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;

            if (puzzle[row][col] !== 0) {
                cell.value = puzzle[row][col];
                cell.readOnly = true;
                cell.classList.add("preset");
            } else {
                cell.addEventListener("input", (e) => validateInput(e.target));
            }

            boardElement.appendChild(cell);
            cells.push(cell);
        }
    }

    // Validate input: Allow only numbers 1-9
    function validateInput(cell) {
        const value = cell.value;
        if (!/^[1-9]$/.test(value)) {
            cell.value = "";
        }
    }

    // Function to check if the board is correctly filled
    function checkSolution() {
        let board = [];
        let isValid = true;

        // Convert cell inputs into a 2D array
        for (let i = 0; i < 9; i++) {
            board[i] = [];
            for (let j = 0; j < 9; j++) {
                const value = cells[i * 9 + j].value;
                board[i][j] = value ? parseInt(value) : 0;
            }
        }

        // Check rows, columns, and 3x3 grids
        for (let i = 0; i < 9; i++) {
            if (!isValidSet(board[i]) || !isValidSet(getColumn(board, i)) || !isValidSet(getBox(board, i))) {
                isValid = false;
                break;
            }
        }

        message.textContent = isValid ? "✅ Correct solution!" : "❌ Incorrect solution!";
        message.style.color = isValid ? "green" : "red";
    }

    // Check if a set (row, column, or 3x3 grid) has unique numbers 1-9
    function isValidSet(numbers) {
        const filtered = numbers.filter(num => num !== 0);
        return new Set(filtered).size === filtered.length;
    }

    // Get a specific column from the board
    function getColumn(board, col) {
        return board.map(row => row[col]);
    }

    // Get a 3x3 grid as an array
    function getBox(board, index) {
        const startRow = Math.floor(index / 3) * 3;
        const startCol = (index % 3) * 3;
        let box = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                box.push(board[startRow + i][startCol + j]);
            }
        }
        return box;
    }

    checkButton.addEventListener("click", checkSolution);
});
