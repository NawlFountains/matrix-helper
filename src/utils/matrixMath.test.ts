import { describe, it, expect } from 'vitest'
import { addMatrices, calculateDeterminant, multiplyMatrices, subMatrices, transposeMatrix} from './matrixMath'

describe('Unit Test - matrixMath', () => {
	describe('addMatrices', () => {
		it('should return the correct operation when adding two valid square matrix', () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[4,-2],[-1,0]]
			const matrixC = [[-2,-4],[0,0]]

			expect(addMatrices(matrixA, matrixB).result).toEqual([[5,0],[2,4]])
			expect(addMatrices(matrixA, matrixC).result).toEqual([[-1,-2],[3,4]])
			expect(addMatrices(matrixB, matrixC).result).toEqual([[2,-6],[-1,0]])
			expect(addMatrices(matrixA, matrixA).result).toEqual([[2,4],[6,8]])
			expect(addMatrices(matrixB, matrixB).result).toEqual([[8,-4],[-2,0]])
			expect(addMatrices(matrixC, matrixC).result).toEqual([[-4,-8],[0,0]])
		})	

		it('should respect matrix commutativity', () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[4,-2],[-1,0]]
			const matrixC = [[-2,-4],[0,0]]

			expect(addMatrices(matrixA, matrixB).result).toEqual(addMatrices(matrixB, matrixA).result)
			expect(addMatrices(matrixA, matrixC).result).toEqual(addMatrices(matrixC, matrixA).result)
			expect(addMatrices(matrixB, matrixC).result).toEqual(addMatrices(matrixC, matrixB).result)
		})

		it('should respect matrix associativity', () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[4,-2],[-1,0]]
			const matrixC = [[-2,-4],[0,0]]

			const resultAB = addMatrices(matrixA,matrixB).result
			const resultBC = addMatrices(matrixB,matrixC).result

			expect(addMatrices(resultAB, matrixC).result).toEqual(addMatrices(matrixA, resultBC).result)
		})

		it('should return the same matrix when adding a zero matrix', () => {
			const matrixA = [[1,2,3],[4,5,6],[7,8,9]]
			const zeromatrix = [[0,0,0],[0,0,0],[0,0,0]]

			const result = addMatrices(matrixA,zeromatrix)

			expect(result.result).toEqual(matrixA)
		})

		it('should work with 1x1 matrices', () => {
			expect(addMatrices([[1]],[[2]]).result).toEqual([[3]])
		})

		it("shouldn't modify the original matrix", () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[4,-2],[-1,0]]

			addMatrices(matrixA, matrixB)

			expect(matrixA).toEqual([[1,2],[3,4]])
			expect(matrixB).toEqual([[4,-2],[-1,0]])

		})

		it("should throw error if matrix aren't the same dimension", () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[4,-2],[-1,0], [2,0]]

			expect(() => addMatrices(matrixA,matrixB)).toThrow('Matrices must have identical dimension for addition')
		})

		it("should throw error if any matrix is malformed", () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[4,-2],[-1], [2,0]]

			expect(() => addMatrices(matrixA,matrixB)).toThrow('Matrices must have identical dimension for addition')
		})

		it("should throw error if any matrix is empty", () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[]]

			expect(() => addMatrices(matrixA,matrixB)).toThrow("Matrix can't be empty")
			expect(() => addMatrices(matrixB, matrixA)).toThrow("Matrix can't be empty")
			expect(() => addMatrices([[]], [[]])).toThrow("Matrix can't be empty")
		})

	})

	describe('subMatrices', () => {
		it('should return the correct operation when subtracting two valid square matrix', () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[4,-2],[-1,0]]
			const matrixC = [[-2,-4],[0,0]]

			expect(subMatrices(matrixA, matrixB).result).toEqual([[-3,4],[4,4]])
			expect(subMatrices(matrixA, matrixC).result).toEqual([[3,6],[3,4]])
			expect(subMatrices(matrixB, matrixC).result).toEqual([[6,2],[-1,0]])
		})	

		it('should return zero matrix of the same dimension if subtracting the same matrix', () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[4,-2, 2],[-1,0,2], [3,2,1]]
			const matrixC = [[-2]]

			expect(subMatrices(matrixA, matrixA).result).toEqual([[0,0],[0,0]])
			expect(subMatrices(matrixB, matrixB).result).toEqual([[0,0,0],[0,0,0],[0,0,0]])
			expect(subMatrices(matrixC, matrixC).result).toEqual([[0]])
		})
		
		it('should return the same matrix when subtracting a zero matrix', () => {
			const matrixA = [[1,2,3],[4,5,6],[7,8,9]]
			const zeromatrix = [[0,0,0],[0,0,0],[0,0,0]]

			const result = subMatrices(matrixA,zeromatrix)

			expect(result.result).toEqual(matrixA)
		})

		it('should work with 1x1 matrices', () => {
			expect(subMatrices([[1]],[[2]]).result).toEqual([[-1]])
		})

		it("shouldn't modify the original matrix", () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[4,-2],[-1,0]]

			subMatrices(matrixA, matrixB)

			expect(matrixA).toEqual([[1,2],[3,4]])
			expect(matrixB).toEqual([[4,-2],[-1,0]])

		})

		it("should throw error if matrix aren't the same dimension", () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[4,-2],[-1,0], [2,0]]

			expect(() => subMatrices(matrixA,matrixB)).toThrow('Matrices must have identical dimension for subtraction')
		})

		it("should throw error if any matrix is malformed", () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[4,-2],[-1], [2,0]]

			expect(() => subMatrices(matrixA,matrixB)).toThrow('Matrices must have identical dimension for subtraction')
		})

		it("should throw error if any matrix is empty", () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[]]

			expect(() => subMatrices(matrixA,matrixB)).toThrow("Matrix can't be empty")
			expect(() => subMatrices(matrixB, matrixA)).toThrow("Matrix can't be empty")
			expect(() => subMatrices([[]], [[]])).toThrow("Matrix can't be empty")
		})

	})

	describe('multiplyMatrices', () => {
		it('should return the correct operation when multiplying two valid square matrix', () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[4,-2],[-1,0]]
			const matrixC = [[-2,-4],[0,0]]

			expect(multiplyMatrices(matrixA, matrixB).result).toEqual([[2,-2],[8,-6]])
			expect(multiplyMatrices(matrixA, matrixC).result).toEqual([[-2,-4],[-6,-12]])
			expect(multiplyMatrices(matrixB, matrixC).result).toEqual([[-8,-16],[2,4]])
		})	

		it('should return zero matrix of correnponding dimension if multiplying to zero matrix', () => {
			const matrixA = [[1,2],[3,4],[5,6]]
			const matrixB = [[4,-2, 2],[-1,0,2], [3,2,1]]
			const matrixC = [[-2]]
			const zeroMatrix33 = [[0,0,0],[0,0,0],[0,0,0]]
			const zeroMatrix22 = [[0,0],[0,0]]
			const zeroMatrix21 = [[0],[0]]
			const zeroMatrix11 = [[0]]

			expect(multiplyMatrices(matrixA, zeroMatrix22).result).toEqual([[0,0],[0,0],[0,0]])
			expect(multiplyMatrices(matrixA, zeroMatrix21).result).toEqual([[0],[0],[0]])
			expect(multiplyMatrices(matrixB, zeroMatrix33).result).toEqual(zeroMatrix33)
			expect(multiplyMatrices(matrixB, zeroMatrix33).result).toEqual(zeroMatrix33)
			expect(multiplyMatrices(matrixC, zeroMatrix11).result).toEqual(zeroMatrix11)
		})

		it('should work with 1x1 matrices', () => {
			expect(multiplyMatrices([[1]],[[2]]).result).toEqual([[2]])
		})

		it("shouldn't modify the original matrix", () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[4,-2],[-1,0]]

			multiplyMatrices(matrixA, matrixB)

			expect(matrixA).toEqual([[1,2],[3,4]])
			expect(matrixB).toEqual([[4,-2],[-1,0]])

		})

		it("should throw error if the first matrix cols and second matrix rows doesn't match", () => {
			const matrixA = [[1,2],[3,4]] // Cols 2
			const matrixB = [[4,-2],[-1,0], [2,0]] // Rows 3

			expect(() => multiplyMatrices(matrixA,matrixB)).toThrow('First matrix rows should match second matrix columns for multiplying')
		})


		it("should throw error if any matrix is empty", () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[]]

			expect(() => multiplyMatrices(matrixA,matrixB)).toThrow("Matrix can't be empty")
			expect(() => multiplyMatrices(matrixB, matrixA)).toThrow("Matrix can't be empty")
			expect(() => multiplyMatrices([[]], [[]])).toThrow("Matrix can't be empty")
		})

	})

	describe('transposeMatrix', () => {
		it('should return correct transpose for square matrix', () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[1,2,3],[4,5,6],[7,8,9]]

			expect(transposeMatrix(matrixA).result).toEqual([[1,3],[2,4]])
			expect(transposeMatrix(matrixB).result).toEqual([[1,4,7],[2,5,8],[3,6,9]])
		})	

		it('should return correct transpose for ragged matrix', () => {
			const matrixA = [[1,2],[3,4],[5,6]]
			const matrixB = [[1],[2],[3]]

			expect(transposeMatrix(matrixA).result).toEqual([[1,3,5],[2,4,6]])
			expect(transposeMatrix(matrixB).result).toEqual([[1,2,3]])
		})	

		it('should return the same for 1x1 matrix', () => {
			expect(transposeMatrix([[1]]).result).toEqual([[1]])
			expect(transposeMatrix([[0]]).result).toEqual([[0]])
			expect(transposeMatrix([[-1]]).result).toEqual([[-1]])
		})	
	
		it('should return the same matrix for simmetric matrix', () => {
			const matrixA = [[1,2],[2,4]]
			const matrixB = [[1,2,3],[2,5,6],[3,6,9]]

			expect(transposeMatrix(matrixA).result).toEqual(matrixA)
			expect(transposeMatrix(matrixB).result).toEqual(matrixB)
		})	

		it('should throw expection if matrix empty', () => {
			expect(() => transposeMatrix([[]])).toThrow("Matrix can't be empty")
			expect(() => transposeMatrix([[],[]])).toThrow("Matrix can't be empty")
			expect(() => transposeMatrix([[],[],[],[]])).toThrow("Matrix can't be empty")
		})	
	})

	describe('calculateDeterminant', () => {
		it('should return correct determinant for any square matrix', () => {
			const matrixA = [[1,2],[3,4]]
			const matrixB = [[-3,2],[3,-4]]
			const matrixC = [[1,2,3],[4,5,6],[7,8,9]]

			expect(calculateDeterminant(matrixA).result).toEqual(-2)
			expect(calculateDeterminant(matrixB).result).toEqual(6)
			expect(calculateDeterminant(matrixC).result).toEqual(0)
		})

		it ('should return 0 for any matrix with a row of zeros', () => {
			expect(calculateDeterminant([[2,3,4],[0,0,0],[1,2,3]]).result).toEqual(0)
			expect(calculateDeterminant([[1,3],[0,0]]).result).toEqual(0)
			expect(calculateDeterminant([[-32,-423,0],[0,0,0],[0,0,0]]).result).toEqual(0)
		})

		it('should return the only element for 1x1 matrix', () => {
			expect(calculateDeterminant([[1]]).result).toEqual(1)
			expect(calculateDeterminant([[-2]]).result).toEqual(-2)
			expect(calculateDeterminant([[0]]).result).toEqual(0)
			expect(calculateDeterminant([[50]]).result).toEqual(50)
		})

		it('should throw error if matrix is not square', () => {
			expect(() => calculateDeterminant ([[1],[1]])).toThrow('Only square matrices have a determinant')
			expect(() => calculateDeterminant ([[1],[1],[1]])).toThrow('Only square matrices have a determinant')
			expect(() => calculateDeterminant ([[1,2],[1,2],[1,2]])).toThrow('Only square matrices have a determinant')
		})

		it('should throw error if matrix is empty', () => {
			expect(() => calculateDeterminant([[]])).toThrow("Matrix can't be empty")
			expect(() => calculateDeterminant([[],[]])).toThrow("Matrix can't be empty")
			expect(() => calculateDeterminant([[],[],[]])).toThrow("Matrix can't be empty")
		})
	})
})
