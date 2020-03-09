'use strict';

class TicTacToe {

	constructor() {
		this._wins = [ // выигрышные комбинации
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		this._text = document.querySelector('.win-text'); // текст модального окна
		this._modal = document.getElementById('modal');   // модальное окно
		this._setMove = true;                             // кто ходит
		this._movesCount = 0;                             // текущий номер хода
		this._isVictory = false;                          // если true - победа
		this._cells = document.querySelectorAll('.cell'); // псевдомассив клеток
		this._cells.forEach(cell => cell.addEventListener('click', event => {
			this._handleMove(event);
		}));

		document.querySelector('.game-restart').addEventListener('click', e => this._handleReset(e));
		document.querySelector('.reset').addEventListener('click', e => this._removeModal(e));


	}


	// переход хода
	_handleMove(event) {
		if (event.target.textContent == '') {
			event.target.textContent = this._setMove ? 'X' : '0';
			this._movesCount++;
			this._setMove = !this._setMove;
			this._handleWin();
		}
	}

	// проверка победы
	_handleWin() {
		this._wins.forEach(win => {
			if (this._cells[win[0]].textContent == 'X' && this._cells[win[1]].textContent == 'X' && this._cells[win[2]].textContent == 'X') {
				this._isVictory = true;
				this._text.textContent = '🍾 Победили Х! 🍾';
				this._declareWinner();
			}
			if (this._cells[win[0]].textContent == '0' && this._cells[win[1]].textContent == '0' && this._cells[win[2]].textContent == '0') {
				this._isVictory = true;
				this._text.textContent = '🍾 Победили 0! 🍾';
				this._declareWinner();
			}
		});
		this._handleDraw();
	}

	// сброс игры
	_handleReset() {
		this._cells.forEach(cell => cell.textContent = '');
		this._movesCount = 0;
		this._isVictory = false;
	}

	// проверка на ничью
	_handleDraw() {
		if (!this._isVictory && this._movesCount == 9) {
			this._text.textContent = '🍾 Ничья! 🍾';
			this._declareWinner();
		}
	}

	// показывает модальное окно
	_declareWinner() {
		this._modal.classList.remove('hidden');
	}

	// скрывает модальное окно, запускает обнуление игры
	_removeModal() {
		this._modal.classList.add('hidden');
		this._handleReset();
	}
}

const game = new TicTacToe;