import { useState, useEffect } from 'react'
import { useMatrix } from './hooks/useMatrix'
import MatrixCard from './components/MatrixCard'
import {addMatrices, calculateDeterminant, multiplyMatrices, parseGridToNumbers, subMatrices, transposeMatrix, type MatrixResult, type ScalarResult} from './utils/matrixMath'
import MatrixCreationInput from './components/MatrixCreationInput'

type OperationType = 'add' | 'subtract' | 'multiply' | 'transpose' | 'determinant'

function App() {

	const internalMatrixA = useMatrix()
	const internalMatrixB = useMatrix()

	const [operation, setOperation] = useState<OperationType>('transpose')
	const [matrixResult, setMatrixResult] = useState<MatrixResult | null>(null)
	const [scalarResult, setScalarResult] = useState<ScalarResult | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isSwapped, setIsSwapped] = useState(false)

	const matrixA = isSwapped ? internalMatrixB : internalMatrixA 
	const matrixB = isSwapped ? internalMatrixA : internalMatrixB 

	const handleSetOperation = (operation: OperationType) => {
		setMatrixResult(null)
		setScalarResult(null)
		if (operation == 'add' || operation == 'subtract') {
			matrixB.setN(matrixA.n)
			matrixB.setM(matrixA.m)

			// Not editable new matrix
		} else if (operation == 'multiply') {
			// Editable new matrix, can add rows
			matrixB.setN(matrixA.m)
			matrixB.setM(matrixA.n)
		}

		setOperation(operation)
	}

	const handleCalculate = () => {
		setError(null)

		const numA = parseGridToNumbers(matrixA.grid)
		const numB = parseGridToNumbers(matrixB.grid)


		try {
			let matrixData: MatrixResult = null
			let scalarData: ScalarResult = null

			switch (operation) {
				case 'add':
					matrixData = addMatrices(numA, numB)
					break
				case 'subtract':
					matrixData = subMatrices(numA, numB)
					break
				case 'multiply':
					matrixData = multiplyMatrices(numA, numB)
					break
				case 'transpose':
					matrixData = transposeMatrix(numA)
					break
				case 'determinant':
					scalarData = calculateDeterminant(numA)
					break
				default:
					return
			}

			setMatrixResult(matrixData)
			setScalarResult(scalarData)
		} catch (err: any) {
			setError(err.message)
			setMatrixResult(null)
			setScalarResult(null)
		}	
	}

	const handleSwapMatrix = () => {
		setIsSwapped(prev => !prev)
	}

	useEffect(() => {
		setMatrixResult(null)
		setScalarResult(null)
		setError(null)
	}, [matrixA.grid, matrixB.grid])

	useEffect(() => {
	    if (operation === 'add' || operation === 'subtract') {
		matrixB.setN(matrixA.n)
		matrixB.setM(matrixA.m)
	    } else if (operation === 'multiply') {
		matrixB.setM(matrixA.n)
		matrixB.setN(matrixA.m)
		// don't touch matrixB.n — user controls that
	    }
	    setMatrixResult(null)
	    setScalarResult(null)
	}, [matrixA.n, matrixA.m])

	
	return (
    <>
    <div className='bg-gruv-fg2 min-h-screen flex flex-col text-center px-4 font-inter'>
    	<h1 className='text-3xl py-4'>Matrix calculator</h1>

      <div className='flex flex-col gap-5'>
       <div className='flex flex-row gap-2 mx-auto'>
       {/* First Matrix Input */}
       <MatrixCreationInput
		n={matrixA.n}
		m={matrixA.m}
		setN={matrixA.setN}
		setM={matrixA.setM}/>
       </div>



       {/* First matrix show */}
       {matrixA.grid && (
	<div className='mx-auto'>
		<h3 className="text-lg font-bold mb-2 text-gruv-orange">A</h3>
	       <MatrixCard matrix={matrixA.grid} changeElement={matrixA.changeElement} addRow = {matrixA.addRow} removeRow={matrixA.removeRow} addCol = {matrixA.addCol} removeCol = {matrixA.removeCol}/>
	       </div>
       )}


       <div className='flex flex-row mx-auto gap-2'>
       {matrixA.grid && (
	       <div className='flex flex-row items-center'>
	       <select 
		  id="operation-select"
		  value={operation}
		  onChange={(e) => handleSetOperation(e.target.value as OperationType)}
		  className="bg-gruv-fg1 border border-neutral-600 rounded p-2 text-black font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
		>
		  <option value="add">+</option>
		  <option value="subtract">-</option>
		  <option value="multiply">×</option>
		  <option value="transpose">T</option>
		  <option value="determinant">det</option>

		</select>		
	       </div>
       )}
       {operation !== 'transpose' && operation !== 'determinant' && (
			<button 
				id='swap-button'
				className='bg-gruv-fg1 border border-neutral-600 rounded p-2 cursor-pointer' 
				onClick={() => handleSwapMatrix()}>
			⇄
			</button>
		)}
       </div>

       {/* Second matrix show */}
       {matrixB.grid && (operation == 'add' || operation == 'subtract') && (
	<div className='mx-auto'>
		<h3 className="text-lg font-bold mb-2 text-gruv-orange">B</h3>
		<MatrixCard matrix={matrixB.grid} changeElement={matrixB.changeElement}/>
	</div>
       )}

	{matrixB.grid && operation == 'multiply' && (
	<div className='mx-auto'>
		<h3 className="text-lg font-bold mb-2 text-gruv-orange">B</h3>
		<MatrixCard matrix={matrixB.grid} changeElement={matrixB.changeElement} addCol={matrixB.addCol} removeCol={matrixB.removeCol}/>
	</div>
       )}

       {matrixA.grid && (
		<button
		  className="bg-gruv-orange text-gruv-fg1 rounded p-2 text-black font-medium cursor-pointer mx-auto px-4"
		  onClick = {() => handleCalculate()}>
			=
		</button>
       )}

       {error && <p className='text-gruv-red'>{error}</p>}

       {/* Result section */}

       {/* Matrix result */}
       {matrixResult && (
	 <div className="flex flex-col gap-8 justify-center items-start mt-4 mx-auto">
          
          <div className='mx-auto'>
            <h3 className="text-lg font-bold mb-2 text-gruv-yellow">Result</h3>
            <MatrixCard matrix={matrixResult.result} className='bg-gruv-fg0'/>
          </div>

          {/* Solution steps */}
          <div className="bg-neutral-800 border border-neutral-700 p-4 rounded-xl w-full text-left font-mono text-sm shadow-md">
            <h3 className="text-lg font-bold mb-3 text-gruv-yellow border-b pb-1">
		Step by step solution for {operation}:
            </h3>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2">
              {matrixResult.steps.map((step, idx) => (
                <p key={`step-${idx}`} className="text-neutral-300">
                  {step}
                </p>
              ))}
            </div>
          </div>

        </div>
       )}

       {/* Scalar result */}
       {scalarResult && (
	 <div className="flex flex-col gap-8 justify-center items-start mt-4 mx-auto">
          
          <div className='mx-auto'>
            <h3 className="text-lg font-bold mb-2 text-gruv-yellow">Result</h3>
	    <p>{scalarResult.result}</p>
          </div>

          {/* Solution steps */}
          <div className="bg-neutral-800 border border-neutral-700 p-4 rounded-xl w-full text-left font-mono text-sm shadow-md">
            <h3 className="text-lg font-bold mb-3 text-gruv-yellow border-b pb-1">
		Step by step solution for {operation}:
            </h3>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2">
              {scalarResult.steps.map((step, idx) => (
                <p key={`step-${idx}`} className="text-neutral-300">
                  {step}
                </p>
              ))}
            </div>
          </div>

        </div>
       )}


      </div>
    </div>
    </>
  )
}

export default App
