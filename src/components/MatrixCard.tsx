import React from 'react'

interface MatrixCardProps {
	matrix: string[][] | number[][] | null
	className?: string | null
	changeElement?: (rowIndex: number, colIndex: number, value: string) => void
}

export default function MatrixCard({ matrix, changeElement, className }: MatrixCardProps) {
	return (
		<div className={`bg-gruv-fg0 flex flex-col items-center rounded-xl items-center w-fit mx-auto border ${className}`}>
	       {matrix?.map((row, rIdx) => (
		       <div key={`row-${rIdx}`} className={`flex flex-row justify-center ${matrix.length > rIdx + 1 ? 'border-b' : ''} divide-x`}>
		       {row.map((item, cIdx) => (
			       changeElement ? (
			       <input 
					key={`cell-${rIdx}-${cIdx}`} 
					className='m-1 p-2 text-center w-12' 
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
	)	
}
