import './layer-head.scss'
import * as PropTypes from 'prop-types'

const LayerHead = ({ layerId, layerPrice }) => {
	const viewDisplay = (
		<>
			{/* header of placement box */}
			<div className='layer-header'>
				<h1 className='layer-title'> Layer {layerId + 1} </h1>
				<span className='layer-badge'>
					<span className='badge-left'> Capacity 100%</span>
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
	layerPrice: PropTypes.number
}

export default LayerHead
