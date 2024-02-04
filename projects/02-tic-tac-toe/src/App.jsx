// Hook: useState y useEffect
import React, { useState } from 'react';

// Components
import Square from './components/Square';
import WinnerModal from './components/WinnerModal';

// Constants
import { TURNS } from './constants';

// Logic
import { checkWinnerFrom, checkEndGame } from './logic/board';
import { saveGameToStorage, resetGameStorage } from './logic/storage';

// Confetti
import confetti from 'canvas-confetti';

function App() {
	// obtener el tablero y el turno desde el localStorage
	const [board, setBoard] = useState(() => {
		const boardFromStorage = window.localStorage.getItem('board');
		if (boardFromStorage) return JSON.parse(boardFromStorage);
		return Array(9).fill(null);
	});

	const [turn, setTurn] = useState(() => {
		const turnFromStorage = window.localStorage.getItem('turn');
		return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.player1;
	});

	// null es que no hay ganador, false es que hay empate
	const [winner, setWinner] = useState(null);

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(TURNS.player1);
		setWinner(null);

		// limpiar el localStorage
		resetGameStorage;
	};

	const updateBoard = (index) => {
		// no actualizamos el tablero si ya hay un valor en esa casilla
		if (board[index] || winner) return;
		// creamos un nuevo tablero con el valor actualizado
		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);
		// cambiamos el turno
		const newTurn = turn === TURNS.player1 ? TURNS.player2 : TURNS.player1;
		setTurn(newTurn);
		// guardar aqui partida y turno
		saveGameToStorage({ board: newBoard, turn: newTurn });

		// revisamos si hay un ganador
		const newWinner = checkWinnerFrom(newBoard);
		if (newWinner) {
			// si hay un ganador
			// lanzamos confetti
			confetti();
			// actualizamos el estado del ganador
			setWinner(newWinner);
		} else if (checkEndGame(newBoard)) {
			setWinner(false); // empate
		}
	};

	return (
		<main className="board">
			<h1>Tic Tac Toe</h1>
			<button onClick={resetGame}>Reiniciar</button>
			<section className="game">
				{board.map((square, index) => {
					return (
						<Square key={index} index={index} updateBoard={updateBoard}>
							{square}
						</Square>
					);
				})}
			</section>
			<section className="turn">
				<Square isSelected={turn === TURNS.player1}>{TURNS.player1}</Square>
				<Square isSelected={turn === TURNS.player2}>{TURNS.player2}</Square>
			</section>
			<WinnerModal winner={winner} resetGame={resetGame} />
		</main>
	);
}

export default App;
