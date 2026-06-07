import React from 'react'

interface MatrixCreationInputProps {
	n: number | '';
	m: number | '';
	setN:  (value: number | '') => void;
	setM:  (value: number | '') => void;
	onCreate: () => void
}

export default function MatrixCreationInput({n, m, setN, setM, onCreate} : MatrixCreationInputProps) {
	return (
	<div className='flex flex-col w-fit rounded-xl bg-gruv-fg1 p-1'>
	       <div className='flex flex-row'>
		<input className='text-center' placeholder='n' type='number' value={n} 
		onChange={(e) => setN(e.target.value === '' ? '' : Number(e.target.value))}/>
		<input className='text-center' placeholder='m' type='number' value={m} 
		onChange={(e) => setM(e.target.value === '' ? '' : Number(e.target.value))}/>
	       </div>
		<button className='border cursor-pointer bg-gruv-fg0 rounded-xl'
			onClick={onCreate}>
			<p>Create matrix A</p>
		</button>
       </div>
	)
}
