import './allocation-layer.scss'
import LayerHead from './layer-head/layer-head'
import LayerAllocation from './layer-allocation/layer-allocation'
import { useEffect, useState } from 'react'
import * as PropTypes from 'prop-types'

const AllocationLayer = ({
	allocationData,
	allocations,
	layerId = 0,
	layerPrice = 0,
	updateAllocation
}) => {
	const [allocationList, setAllocationList] = useState(allocationData || [])
	// console.log('setAllocationList : ', setAllocationList)

	const setAllocation = (allocationId, updateValue) => {
		updateAllocation(layerId, updateValue)
	}

	useEffect(() => {
		setAllocationList(allocationData)
	}, [allocationData])

	const viewDisplay = (
		<>
			{/* header of placement box */}
			<section className='allocation-layer-content'>
				<LayerHead
					layerId={layerId}
					layerPrice={layerPrice}
					allocation={allocationList}
				/>
				<LayerAllocation
					allocation={allocationList}
					allocationId={allocations?._id}
					allocationLeadOffice={allocations?.leadOffice}
					updateAllocation={setAllocation}
				/>
			</section>
		</>
	)

	return <>{viewDisplay}</>
}
AllocationLayer.propTypes = {
	allocations: PropTypes.object,
	allocationData: PropTypes.array,
	layerId: PropTypes.number,
	layerPrice: PropTypes.number,
	updateAllocation: PropTypes.func
}

export default AllocationLayer
