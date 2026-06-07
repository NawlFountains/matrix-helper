// matrixMath.ts

export interface CalculationResult {
	result: number[][];
	steps: string[];
}

export const parseGridToNumbers = (grid: string[][] | null): number[][] => {
	if (!grid) return [];
	return grid.map(row => row.map(cell => {
		const num = Number(cell)
		return isNaN(num) ? 0 : num;
	}));
};

export const addMatrices = (matrixA: number[][], matrixB: number[][]): CalculationResult => {
	if (matrixA.length !== matrixB.length || matrixA[0]?.length !== matrixB[0]?.length) {
		throw new Error('Matrices must have identical dimension for addition')	
	}
	
	const steps: string[] = [];
	const result = Array.from({ length: matrixA.length}, () => Array(matrixA[0].length).fill(0))

	for (let i=0; i < matrixA.length; i++) {
		for (let j=0; j < matrixA[0].length; j++) {
			result[i][j] = matrixA[i][j] + matrixB[i][j]	
			steps.push(`Cell [${i+1}, ${j+1}] = A[${i+1},${j+1}] + B[${i+1},${j+1}] = ${matrixA[i][j]} + ${matrixB[i][j]} = ${result[i][j]}`)
		}
	}

	return { result, steps };
};


export const subMatrices = (matrixA: number[][], matrixB: number[][]): CalculationResult => {
	if (matrixA.length !== matrixB.length || matrixA[0]?.length !== matrixB[0]?.length) {
		throw new Error('Matrices must have identical dimension for subtraction')	
	}
	
	const steps: string[] = [];
	const result = Array.from({ length: matrixA.length}, () => Array(matrixA[0].length).fill(0))

	for (let i=0; i < matrixA.length; i++) {
		for (let j=0; j < matrixA[0].length; j++) {
			result[i][j] = matrixA[i][j] - matrixB[i][j]	
			steps.push(`Cell [${i+1}, ${j+1}] = A[${i},${j}] - B[${i+1},${j+1}] = ${matrixA[i][j]} - ${matrixB[i][j]} = ${result[i][j]}`)
		}
	}

	return { result, steps };
};

export const multiplyMatrices = (matrixA: number[][], matrixB: number[][]): CalculationResult => {
	const rowsA = matrixA.length;
	const colsA = matrixA[0]?.length || 0;
	const rowsB = matrixB.length;
	const colsB = matrixB[0]?.length || 0;

	if (colsA !== rowsB) {
		throw new Error('First matrix rows should match second matrix columns for multiplying')
	}

	const steps: string[] = []
	const result = Array.from({ length: rowsA }, () => Array(colsB).fill(0))

	for (let i=0; i < rowsA; i++) { // For every row of the first matrix
		for (let j=0; j < colsB; j++) { // For every col in the second matrix
			const valueTerms: string[] = []
			const posTerms: string[] = []

			let dotProductSum = 0;
			for (let k=0; k < colsA; k++) { // Multiply and sum every element of the column to the row
				dotProductSum += matrixA[i][k] * matrixB[k][j];
				posTerms.push(`(A[${i+1},${k+1}] x B[${k+1},${j+1}])`)
				valueTerms.push(`(${matrixA[i][k]} x ${matrixB[k][j]})`)
			}

			result[i][j] = dotProductSum;
			steps.push(`Cell [${i+1}, ${j+1}]: ${posTerms.join(" + ")} = ${valueTerms.join(" + ")} = ${dotProductSum}`);
		}
	}

	return { result, steps };
};

export const transposeMatrix = (matrix: number[][]): CalculationResult => {	
	const steps: string[] = [];
	const result = Array.from({ length: matrix[0].length}, () => Array(matrix.length).fill(0))


	for (let i=0; i < matrix[0].length; i++) {
		for (let j=0; j < matrix.length; j++) {
			steps.push(`Cell [${i+1},${j+1}] : A[${j+1},${i+1}] = ${matrix[j][i]}`)
			result[i][j] = matrix[j][i]
		}
	}

	return { result, steps }
}
