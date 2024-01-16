/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Game {
  constructor(height, width) {
    this.HEIGHT = height;
    this.WIDTH = width;
    this.currPlayer = 1;
    this.board = this.makeBoard();
    this.gameOver = false;

    this.makeHtmlBoard();
    this.initEventListeners();
  }

/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */

  makeBoard() {
    return Array.from({ length: this.HEIGHT }, () => Array(this.WIDTH).fill(null));
  }

/** makeHtmlBoard: make HTML table and row of column tops. */

  makeHtmlBoard() {
    const boardElement = document.getElementById('board');

    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', (evt) => this.handleClick(evt));

    for (let x = 0; x < this.WIDTH; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    boardElement.append(top);

    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      boardElement.append(row);
    }
  }

  initEventListeners() {
    document.getElementById('start-btn').addEventListener('click', () => this.startGame());
    document.getElementById('color-form').addEventListener('submit', (evt) => this.setPlayerColors(evt));
  }

/** findSpotForCol: given column x, return top empty y (null if filled) */

  findSpotForCol(x) {
    for (let y = this.HEIGHT - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

/** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece', `p${this.currPlayer}`);
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

/** endGame: announce game end */

  endGame(msg) {
    alert(msg);
    this.gameOver = true;
  }

/** handleClick: handle click of column top to play piece */

  handleClick(evt) {
    if (this.gameOver) return;

    const x = +evt.target.id;
    const y = this.findSpotForCol(x);

    if (y === null) {
      return;
    }

    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);

    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer} won!`);
    }

    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }

    this.switchPlayers();
  }

  switchPlayers() {
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }

/** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
    function _win(cells) {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        if (_win.call(this, horiz) || _win.call(this, vert) || _win.call(this, diagDR) || _win.call(this, diagDL)) {
          return true;
        }
      }
    }

    return false;
  }

  startGame() {
    this.gameOver = false;
    this.board = this.makeBoard();
    this.currPlayer = 1;
    this.clearBoard();
  }

  clearBoard() {
    const cells = document.querySelectorAll('.piece');
    cells.forEach(cell => cell.remove());
  }

  setPlayerColors(evt) {
    evt.preventDefault();

    const player1Color = document.getElementById('player1-color').value;
    const player2Color = document.getElementById('player2-color').value;

    let player1 = new Player(player1Color);
    let player2 = new Player(player2Color);

    document.documentElement.style.setProperty('--player1-color', player1Color);
    document.documentElement.style.setProperty('--player2-color', player2Color);

    this.startGame();
  }
}

class Player {
  constructor(color) {
    this.color = color;
  }
}

// Create an instance of the Game class with height 6 and width 7

new Game(6, 7);
