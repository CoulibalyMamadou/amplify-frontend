import './layer-head.scss'
import * as PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

const LayerHead = ({ layerId, layerPrice, allocation }) => {
	const [capacity, setCapacity] = useState(0)

	const capacityValue = () => {
		let newCapacity = 0
		allocation.map((value) => (newCapacity += value.share))
		setCapacity(newCapacity)
	}
	useEffect(() => {
		capacityValue()
	}, [allocation])
	const viewDisplay = (
		<>
			{/* header of placement box */}
			<div className='layer-header'>
				<h1 className='layer-title'> Layer {layerId + 1} </h1>
				<span className='layer-badge'>
					<span className='badge-left'> Capacity {capacity}%</span>
					<span className='badge-right'>
						Adjusted Premium (%) {layerPrice.toFixed(3)}{' '}
					</span>
				</span>
			</div>
		</>
	)

	return <>{viewDisplay}</>
}

LayerHead.propTypes = {
	layerId: PropTypes.number,
	layerPrice: PropTypes.number,
	allocation: PropTypes.array
}

export default LayerHead
