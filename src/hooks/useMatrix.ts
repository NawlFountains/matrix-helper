import { useState } from "react";

export function useMatrix() {
	const [n, setN] = useState<number | "">("")
	const [m, setM] = useState<number | "">("")
	const [grid, setGrid] = useState<string[][] | null>(null)

	const createEmptyMatrix = () => {
		const rows = n === "" ? 0 : n
		const cols = m === "" ? 0 : m

		const newMatrix = Array.from({ length: rows }, () =>
			Array.from({ length: cols }, () => "")
		)
		setGrid(newMatrix)
	}


	const changeElement = (rowIndex: number, colIndex: number, value: string) => {
		if (!grid) return

		if (value === '' || value === '-' || !isNaN(Number(value))) {
			const updatedMatrix = grid.map((row, rIdx) =>
				row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? value : cell))
			)
			setGrid(updatedMatrix)
		}
	}


	const resetMatrix = () => {
		setN("")
		setM("")
		setGrid(null)
	}

	return {
		n,
		m,
		grid,
		setN,
		setM,
		createEmptyMatrix,
		changeElement,
		resetMatrix,
	}
}
