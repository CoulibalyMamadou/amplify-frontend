import './layer-allocation.scss'
import AllocationItem from './allocation-item/allocation-item'
import { useState } from 'react'
import * as PropTypes from 'prop-types'

const LayerAllocation = ({ allocation }) => {
	const [allocationList, setAllocationList] = useState(allocation || [])
	console.log('LayerAllocation allocation : ', allocation)
	console.log('setAllocationList : ', setAllocationList)
	const viewDisplay = (
		<>
			{/* header of placement box */}
			<div className='quotation-view'>
				{allocationList.map((value, index) => {
					return index === 0 ? (
						<AllocationItem key={index} allocation={value} index={index} />
					) : (
						<AllocationItem key={index} allocation={value} index={index} />
					)
				})}
			</div>
		</>
	)

	return <>{viewDisplay}</>
}

LayerAllocation.propTypes = {
	allocation: PropTypes.array
}

export default LayerAllocation
