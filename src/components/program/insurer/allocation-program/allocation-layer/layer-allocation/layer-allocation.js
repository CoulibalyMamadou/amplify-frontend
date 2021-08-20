import './layer-allocation.scss'
import AllocationItem from './allocation-item/allocation-item'
import { useEffect, useState } from 'react'
import * as PropTypes from 'prop-types'
import { allocationUpdate } from '../../../../../../api/program.service'

const LayerAllocation = ({
	allocation,
	allocationId,
	allocationLeadOffice,
	updateAllocation
}) => {
	const [allocationList, setAllocationList] = useState([])
	console.log('LayerAllocation allocation : ', allocation)
	const setLeadInsurer = (idOffice) => {
		const patchAllocation = {
			allocationId,
			leadOffice: idOffice
		}
		allocationUpdate(patchAllocation)
			.then((res) => res.json())
			.then((allocation) => {
				console.log('Allocation coming: ', allocation)
				updateAllocation(allocationId, allocation)
			})
		console.log('allocationId: ', allocationId)
	}
	useEffect(() => {
		setAllocationList(allocation)
	}, [allocation])

	return (
		<>
			{/* header of placement box */}
			<div className='quotation-view'>
				{allocationList.map((value, index) => {
					return index === 0 ? (
						<AllocationItem
							key={index}
							allocation={value}
							index={index}
							leadOffice={allocationLeadOffice}
							setLead={setLeadInsurer}
						/>
					) : (
						<AllocationItem
							key={index}
							allocation={value}
							index={index}
							leadOffice={allocationLeadOffice}
							setLead={setLeadInsurer}
						/>
					)
				})}
			</div>
		</>
	)
}

LayerAllocation.propTypes = {
	allocation: PropTypes.array,
	allocationId: PropTypes.string,
	allocationLeadOffice: PropTypes.string,
	updateAllocation: PropTypes.func
}

export default LayerAllocation
