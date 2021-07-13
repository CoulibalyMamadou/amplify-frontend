import './layer-head.scss'

const LayerHead = () => {
	const viewDisplay = (
		<>
			{/* header of placement box */}
			<div className='layer-header'>
				<h1 className='layer-title'> Layer 1 </h1>
				<span className='layer-badge'>
					<span className='badge-left'> Capacity 100%</span>
					<span className='badge-right'> RoL 4.28% </span>
				</span>
			</div>
		</>
	)

	return <>{viewDisplay}</>
}

export default LayerHead
