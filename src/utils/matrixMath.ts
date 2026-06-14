// matrixMath.ts

export interface MatrixResult {
	result: number[][];
	steps: string[];
}

export interface ScalarResult {
	result: number;
	steps: string[];
}

export const parseGridToNumbers = (grid: string[][] | null): number[][] => {
	if (!grid) return [];
	return grid.map(row => row.map(cell => {
		const num = Number(cell)
		return isNaN(num) ? 0 : num;
	}));
};

export const isEmptyMatrix = (matrix: number[][]) : boolean => {
	return matrix.length == 0 || matrix[0]?.length === 0
}

export const addMatrices = (matrixA: number[][], matrixB: number[][]): MatrixResult => {
	if (isEmptyMatrix(matrixA) || isEmptyMatrix(matrixB)) {
		throw new Error("Matrix can't be empty")
	}
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


export const subMatrices = (matrixA: number[][], matrixB: number[][]): MatrixResult => {
	if (isEmptyMatrix(matrixA) || isEmptyMatrix(matrixB)) {
		throw new Error("Matrix can't be empty")
	}
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

export const multiplyMatrices = (matrixA: number[][], matrixB: number[][]): MatrixResult => {
	const rowsA = matrixA.length;
	const colsA = matrixA[0]?.length || 0;
	const rowsB = matrixB.length;
	const colsB = matrixB[0]?.length || 0;

	if (isEmptyMatrix(matrixA) || isEmptyMatrix(matrixB)) {
		throw new Error("Matrix can't be empty")
	}

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

export const transposeMatrix = (matrix: number[][]): MatrixResult => {	
	const steps: string[] = [];
	const result = Array.from({ length: matrix[0].length}, () => Array(matrix.length).fill(0))

	if (isEmptyMatrix(matrix)) {
		throw new Error("Matrix can't be empty")
	}


	for (let i=0; i < matrix[0].length; i++) {
		for (let j=0; j < matrix.length; j++) {
			steps.push(`Cell [${i+1},${j+1}] : A[${j+1},${i+1}] = ${matrix[j][i]}`)
			result[i][j] = matrix[j][i]
		}
	}

	return { result, steps }
}

export const calculateDeterminant = (matrix: number[][]): ScalarResult => {
	const rows = matrix.length;
	const cols = matrix[0]?.length || 0;
	if (isEmptyMatrix(matrix)) {
		throw new Error("Matrix can't be empty")
	}
	if (rows !== cols) {
		throw new Error('Only square matrices have a determinant');
	}

	const steps: string[] = [];
	let result = 0;

	if (rows === 1) {
		result = matrix[0][0];
		steps.push(`det(A) = ${result}`);
	} else if (rows === 2) {
		result = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
		steps.push(`det(A) = (${matrix[0][0]} × ${matrix[1][1]}) - (${matrix[0][1]} × ${matrix[1][0]}) = ${result}`);
	} else {
		const expansionTerms: string[] = [];
		const valueTerms: string[] = [];
		const resultTerms: string[] = [];

		for (let j = 0; j < cols; j++) {
			const subMatrix = matrix
				.filter((_, rowIndex) => rowIndex !== 0)
				.map(row => row.filter((_, colIndex) => colIndex !== j));

			const subMatrixDet = calculateDeterminant(subMatrix);
			const sign = j % 2 === 0 ? 1 : -1;
			const signStr = j === 0 ? '' : sign === 1 ? ' + ' : ' - ';
			const cofactor = sign * matrix[0][j] * subMatrixDet.result;

			result += cofactor;

			const subMatrixStr = `[${subMatrix.map(r => `[${r.join(',')}]`).join(',')}]`;

			expansionTerms.push(`${signStr}${matrix[0][j]} × det(${subMatrixStr})`);
			valueTerms.push(`${signStr}${matrix[0][j]} × (${subMatrixDet.result})`);
			resultTerms.push(`${signStr}${cofactor}`); 
		}

		steps.push(`det(A) = ${expansionTerms.join('')}`);
		steps.push(`       = ${valueTerms.join('')}`);
		steps.push(`       = ${resultTerms.join('')}`);
		steps.push(`       = ${result}`);
	}

	return { result, steps };
};

