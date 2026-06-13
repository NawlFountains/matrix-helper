import { useState, useEffect, useRef } from "react";

export function useMatrix() {
	const [n, setN] = useState<number | "">(3)
	const [m, setM] = useState<number | "">(3)
	const [grid, setGrid] = useState<string[][] | null>(null) 
	const isInternalUpdate = useRef(false) // Flag to not use effect

	useEffect(() => {
		if (isInternalUpdate.current) {
			isInternalUpdate.current = false
			return
		}
		if (n !== "" && m !== "") {
		    setGrid(
			Array.from({ length: n }, () =>
			    Array.from({ length: m }, () => "")
			)
		    )
		} else {
		    setGrid(null)
		}
	    }, [n, m])
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

	const addRow = () => {
		if (!grid || m == "") return
		isInternalUpdate.current = true
		setGrid([...grid, Array.from({ length: m as number }, () => '')])
		setN(prev => prev === '' ? 1 : prev + 1)
	}

	const addCol = () => {
		if (!grid || n == "") return
		isInternalUpdate.current = true
		setGrid(grid.map(row => [...row, '']))
		setM(prev => prev === '' ? 1 : prev + 1)
	}

	const removeRow = () => {
		if (!grid || (n as number) <= 1) return
		isInternalUpdate.current = true
		setGrid(grid.slice(0, -1))
		setN(prev => prev === '' ? 1 : prev - 1)
	}

	const removeCol = () => {
		if (!grid || (m as number <= 1)) return
		isInternalUpdate.current = true
		setGrid(grid.map (row => row.slice(0, -1)))
		setM(prev => prev === '' ? 1 : prev - 1)
	}

	return {
		n,
		m,
		grid,
		setN,
		setM,
		changeElement,
		addRow,
		removeRow,
		addCol,
		removeCol,
		resetMatrix,
	}
}
