import './allocation-program.scss'
import AllocationLayer from './allocation-layer/allocation-layer'
import { useState } from 'react'

const AllocationProgram = () => {
	const allocationData = [
		{
			id: 0,
			allocation: [20, 21, 76, 43, 23, 14, 0.2, 32]
		},
		{
			id: 1,
			allocation: [20, 39, 0.2, 67, 32, 43, 32]
		},
		{
			id: 2,
			allocation: [20, 39, 41, 32]
		},
		{
			id: 3,
			allocation: [20, 39, 41, 43, 21, 76, 0.2, 67, 32, 43, 32]
		},
		{
			id: 4,
			allocation: [20, 39, 0.2, 67, 32, 43, 32]
		}
	]

	const [allocationList, setAllocationList] = useState(allocationData || null)
	console.log('setConstraintList : ', setAllocationList)

	const viewDisplay = (
		<section className='allocation-program-content'>
			{/* header of placement box */}
			{allocationList.map((allocation) => {
				return (
					<AllocationLayer
						key={allocation.id}
						allocationData={allocation.allocation}
					/>
				)
			})}
		</section>
	)

	return <>{viewDisplay}</>
}

export default AllocationProgram
