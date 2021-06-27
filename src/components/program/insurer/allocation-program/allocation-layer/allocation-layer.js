import './allocation-layer.scss'
import LayerHead from './layer-head/layer-head'
import LayerAllocation from './layer-allocation/layer-allocation'
import { useState } from 'react'
import * as PropTypes from 'prop-types'

const AllocationLayer = ({ allocationData }) => {
	const [allocationList, setAllocationList] = useState(allocationData || [])
	console.log('setAllocationList : ', setAllocationList)

	const viewDisplay = (
		<>
			{/* header of placement box */}
			<section className='allocation-layer-content'>
				<LayerHead />
				<LayerAllocation allocation={allocationList} />
			</section>
		</>
	)

	return <>{viewDisplay}</>
}
AllocationLayer.propTypes = {
	allocationData: PropTypes.array
}

export default AllocationLayer
