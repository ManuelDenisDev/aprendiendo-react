// Hook: useState
import React, { useState } from 'react';

const TURNS = {
	player1: 'X',
	player2: 'O',
};

const Square = ({ children, isSelected, updateBoard, index }) => {
	const className = `square ${isSelected ? 'is-selected' : ''}`;

	const handleClick = () => {
		updateBoard(index);
	};

	return (
		<div onClick={handleClick} className={className}>
			{children}
		</div>
	);
};

const WINNER_COMBOS = [
	[0, 1, 2], // horizontal
	[3, 4, 5], // horizontal
	[6, 7, 8], // horizontal
	[0, 3, 6], // vertical
	[1, 4, 7], // vertical
	[2, 5, 8], // vertical
	[0, 4, 8], // diagonal
	[2, 4, 6], // diagonal
];

function App() {
	const [board, setBoard] = useState(Array(9).fill(null));

	const [turn, setTurn] = useState(TURNS.player1);

	// null es que no hay ganador, false es que hay empate
	const [winner, setWinner] = useState(null);

	const checkWinner = (boardToCheck) => {
		// revisamos todas las combinaciones posibles
		// para ver si hay un ganador
		for (const combo of WINNER_COMBOS) {
			const [a, b, c] = combo;
			if (
				boardToCheck[a] && // 0 -> X u O
				boardToCheck[a] === boardToCheck[b] &&
				boardToCheck[a] === boardToCheck[c]
			) {
				return boardToCheck[a]; // X u O
			}
		}
		// si no hay ganador
		return null;
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
		// revisamos si hay un ganador
		const newWinner = checkWinner(newBoard);
		if (newWinner) {
			setWinner(newWinner); // actualizamos el estado del ganador
		}
	};

	return (
		<main className='board'>
			<h1>Tic Tac Toe</h1>
			<section className='game'>
				{board.map((_, index) => {
					return (
						<Square key={index} index={index} updateBoard={updateBoard}>
							{board[index]}
						</Square>
					);
				})}
			</section>
			<section className='turn'>
				<Square isSelected={turn === TURNS.player1}>{TURNS.player1}</Square>
				<Square isSelected={turn === TURNS.player2}>{TURNS.player2}</Square>
			</section>
		</main>
	);
}

export default App;
