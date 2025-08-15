const easy = document.querySelector('.easy');
const normal = document.querySelector('.normal');
const hard = document.querySelector('.hard');
const board = document.querySelector('.container');
const home = document.querySelector('.home')
let gameActive = false;
let rows, cols, mines, cells = [], minePositions = [];

home.addEventListener('click', () => {
    window.location.href = "../index.html"
});

easy.addEventListener('click', () => StartGame(8, 8, 10));
normal.addEventListener('click', () => StartGame(12, 12, 20));
hard.addEventListener('click', () => StartGame(16, 16, 40));


function StartGame(r, c, m) {
    document.querySelector('.diffCon').style.display = 'none';
    document.querySelector('.gameCon').style.display = 'block';
    gameActive = true;
    rows = r;
    cols = c;
    mines = m; 
    cells = [];
    minePositions = [];

    board.innerHTML = '';
    board.style.gridTemplateRows = `repeat(${rows}, 42px)`;
    board.style.gridTemplateColumns = `repeat(${cols}, 42px)`;

    for (let i = 0; i < rows; i++) {
        cells[i] = [];
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            board.appendChild(cell);
            cells[i][j] = cell;

            cell.addEventListener('click', () => revealCell(i, j));
            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                toggleFlag(i, j);
            });
        }
    }

    let placed = 0;
    while (placed < mines) {
        let rPos = Math.floor(Math.random() * rows);
        let cPos = Math.floor(Math.random() * cols);
        if (!minePositions.some(pos => pos[0] === rPos && pos[1] === cPos)) {
            minePositions.push([rPos, cPos]);
            placed++;
        }
    }
}

function countAdjacentMines(r, c) {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            let nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                if (minePositions.some(pos => pos[0] === nr && pos[1] === nc)) {
                    count++;
                }
            }
        }
    }
    return count;
}

function revealCell(r, c) {
    if (!gameActive) return;
    const cell = cells[r][c];
    if (cell.classList.contains('revealed') || cell.classList.contains('flag')) return; 

    cell.classList.add('revealed');

    if (minePositions.some(pos => pos[0] === r && pos[1] === c)) {
        cell.classList.add('mine');
        cell.textContent = '💣';
        gameOver(false);
        return;
    }

    let count = countAdjacentMines(r, c);
    if (count > 0) {
        cell.classList.add(`num${count}`);
        cell.textContent = count;
    } else {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                let nr = r + dr, nc = c + dc; 
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    revealCell(nr, nc);
                }
            }
        }
    }

}

function toggleFlag(r, c) {
    if (!gameActive) return;
    const cell = cells[r][c];
    if (cell.classList.contains('revealed')) return;
    cell.classList.toggle('flag');
    cell.textContent = cell.classList.contains('flag') ? '🚩' : '';
}

function gameOver(won = false) {
    gameActive = false;

    minePositions.forEach(([r, c]) => {
        const cell = cells[r][c];
        if (!cell.classList.contains('revealed')) {
            cell.classList.add('revealed', 'mine');
            cell.textContent = '💣';
        }
    });

    const oldBtn = document.querySelector('.play-again');
    if (oldBtn) oldBtn.remove();

    const playAgainBtn = document.createElement('button');
    playAgainBtn.textContent = 'Play Again';
    playAgainBtn.classList.add('play-again');

    playAgainBtn.addEventListener('click', () => {
        playAgainBtn.remove(); 
        document.querySelector('.gameCon').style.display = 'none';
        document.querySelector('.diffCon').style.display = 'block';
        board.innerHTML = ''; 
    });

    document.body.appendChild(playAgainBtn);
}