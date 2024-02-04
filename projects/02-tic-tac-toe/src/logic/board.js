import { WINNER_COMBOS } from '../constants';

export const checkWinnerFrom = (boardToCheck) => {
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

export const checkEndGame = (newBoard) => {
	// revisamos si hay un empate
	// si no hay espacios vacios en el tablero
	// y no hay un ganador
	return newBoard.every((square) => square !== null);
};
