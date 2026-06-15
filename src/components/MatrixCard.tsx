import React from 'react'

interface MatrixCardProps {
	matrix: string[][] | number[][] | null
	className?: string | null
	changeElement?: (rowIndex: number, colIndex: number, value: string) => void
	addRow?: () => void
	removeRow?: () => void
	addCol?: () => void
	removeCol?: () => void
}

export default function MatrixCard({ matrix, changeElement, className, addRow, removeRow, addCol, removeCol }: MatrixCardProps) {

	// Map the border if we can edit or no the matrix (addRow, addCol)
	const matrixBorderRadiousMap= {
		'false-false': 'rounded-xl',
		'true-false':  'rounded-t-xl',
		'false-true':  'rounded-l-xl',
		'true-true':   'rounded-tl-xl',
	} as const

	const radius = matrixBorderRadiousMap[`${!!addRow}-${!!addCol}`]

	return (
		<div className='flex flex-row items-stretch'>
		<div className='flex flex-col'>
		<div className={`bg-gruv-fg0 flex flex-col items-center ${radius} items-center w-fit mx-auto border ${className}`}>
	       {matrix?.map((row, rIdx) => (
		       <div key={`row-${rIdx}`} className={`flex flex-row justify-center ${matrix.length > rIdx + 1 ? 'border-b' : ''} divide-x`}>
		       {row.map((item, cIdx) => (
			       changeElement ? (
			       <input 
					key={`cell-${rIdx}-${cIdx}`} 
					className='m-1 p-2 text-center w-12 focus:bg-gruv-orange focus:text-gruv-fg0 transition-all' 
					placeholder='0'
					value={item}
					onChange={(e) => changeElement(rIdx,cIdx,e.target.value)}/>
			       ) : (
			       	<span
					key={`cell-static-${rIdx}-${cIdx}`}
					className='m-1 p-2 text-center w-12 h-10'>
				{item}
				</span>
			       )
		       ))}
			</div>
	       ))}
		</div>

		{/* Add/Remove rows*/}

		{removeRow && addRow && (
			<div className='flex flex-row'>
			<button data-testid='remove-row-btn' onClick={removeRow} className='rounded-b-xl w-full h-6 mr-auto cursor-pointer bg-gruv-red text-white'>
			-</button>
			<button data-testid='add-row-btn' onClick={addRow} className='rounded-b-xl w-full h-6 mr-auto cursor-pointer bg-gruv-orange text-white'>
			+</button>
			</div>
	       )}
	     </div>
		{/* Add/remove cols*/}
	       
	       {addCol && removeCol && (
		       <div className={`flex flex-col self-stretch ${addRow ? 'mb-6' : ''}`}>
			<button data-testid='add-col-btn' onClick={addCol} className={`rounded-r-xl w-6 flex-1 cursor-pointer bg-gruv-orange text-white`}>
			+</button>
			<button data-testid='remove-col-btn' onClick={removeCol} className={`rounded-r-xl w-6 flex-1 cursor-pointer bg-gruv-red text-white`}>
			-</button>
			</div>
	       )}
	     </div>
	)	
}
