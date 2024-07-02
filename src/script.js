window.onload = () => {
    const ROWS = 10;
    const COLS = 10;
    const MINES = 40;
    let grid = [];

    for (let i = 0; i < ROWS; i++) {
        let arr = [];
        for (let j = 0; j < COLS; j++) {
            arr.push(false);
        }
        grid.push(arr);
    }

// Add the mines
    for (let i = 0; i < MINES; i++) {
        let x = getRandomNumber(ROWS - 1);
        let y = getRandomNumber(COLS - 1);
        if (grid[y][x]) {
            i--;
        } else {
            grid[y][x] = true;
        }
    }
    console.log(grid);

    function $(id) {
        return document.getElementById(id);
    }

    function getRandomNumber(max) {
        let random = Math.random();
        random = Math.floor(random * max);
        return random + 1;
    }

    function getNearbyMines(col, row) {
        const isRight = col === COLS - 1;
        const isLeft = col === 0;
        const isTop = row === 0;
        const isBottom = row === ROWS - 1;

        let total = 0;
        // If not on top
        if (!isTop && grid[row - 1][col]) {
            total++;
        }
        // If not on bottom
        if (!isBottom && grid[row + 1][col]) {
            total++;
        }
        // If not on the right
        if (!isRight && grid[row][col + 1]) {
            total++;
        }
        // If not on the left
        if (!isLeft && grid[row][col - 1]) {
            total++;
        }
        // If not top right
        if (!isRight && !isTop && grid[row - 1][col + 1]) {
            total++;
        }
        // If not top left
        if (!isTop && !isLeft && grid[row - 1][col - 1]) {
            total++;
        }
        // If not bottom right
        if (!isBottom && !isRight && grid[row + 1][col + 1]) {
            total++;
        }
        // If not bottom left
        if (!isBottom && !isLeft && grid[row + 1][col - 1]) {
            total++;
        }

        return total;
    }

    function processClick(el) {
        let row;
        let col;
        for (let i = 0; i < el.parentElement.parentElement.children.length; i++) {
            for (let j = 0; j < el.parentElement.children.length; j++) {
                if (el.parentElement.parentElement.children[i].children[j] === el) {
                    row = i;
                    col = j;
                }
            }

        }
        const thisElement = el.parentElement.parentElement.children[row].children[col];
        if (grid[row][col]) {
            $('header').textContent = 'BOOM!';
        } else if (!grid[row][col]) {
            let num = getNearbyMines(col, row);
            thisElement.classList.add(num === 0 ? 'zero' : num === 1 ? 'one' : num === 2 ? 'two' : num === 3 ? 'three' : num === 4 ? 'four' : num === 5 ? 'five' : num === 6 ? 'six' : num === 7 ? 'seven' : 'eight');
            thisElement.textContent = '' + num;
        }

    }

    let tableElement = document.createElement('table');
    tableElement.setAttribute('id', 'gridTable');
    $('gridContainer').appendChild(tableElement);
    let table = $('gridTable');

    for (let i = 0; i < ROWS; i++) {
        let newRow = document.createElement('tr');
        for (let j = 0; j < COLS; j++) {
            let newData = document.createElement('td')
            newData.onclick = function () {
                processClick(this);
            }
            newRow.appendChild(newData);
        }
        table.appendChild(newRow);
    }
}