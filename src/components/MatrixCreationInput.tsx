import React from 'react'

interface MatrixCreationInputProps {
	n: number | '';
	m: number | '';
	setN:  (value: number | '') => void;
	setM:  (value: number | '') => void;
}

export default function MatrixCreationInput({n, m, setN, setM} : MatrixCreationInputProps) {
	return (
	<div className='flex flex-col items-center gap-2'>
	{/* Global CSS injection to completely clear browser arrow paddings */}
	<style>{`
		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		input[type=number] {
			-moz-appearance: textfield;
		}
		`}</style>
		<span className='text-gruv-bg0 font-semibold'>Dimensions</span>
		<div className='flex bg-gruv-fg1 rounded-xl gap-3'>

		       {/* Input Rows */}
		       <div className='relative flex items-center group w-24'>

			<span className='absolute left-2 transition-all group-focus-within:text-gruv-fg1'>n:</span>
			<input className='text-center p-1 rounded-xl w-full pl-10 focus:bg-gruv-orange focus:text-gruv-fg1 transition-all' placeholder='n' type='number' value={n} 
			onChange={(e) => setN(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}/>

		       </div>
		       
		       {/* Multiplier Cross Sign */}
		       <span className="text-gruv-bg1 font-medium text-sm select-none translate-y-[6px]">×</span>

		       {/* Input Columns */}
		       <div className='relative flex items-center group w-24'>

			<span className='absolute left-2 transition-all group-focus-within:text-gruv-fg1'>m:</span>
			<input className='text-center p-1 rounded-xl w-full pl-10 focus:bg-gruv-orange focus:text-gruv-fg1 transition-all' placeholder='m' type='number' value={m} 
			onChange={(e) => setM(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}/>

		       </div>
	       </div>
       </div>
	)
}
