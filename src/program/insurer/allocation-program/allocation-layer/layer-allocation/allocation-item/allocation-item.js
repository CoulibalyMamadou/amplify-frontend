import './allocation-item.scss'
import * as PropTypes from 'prop-types'

const AllocationItem = ({ allocation, index }) => {
	const viewDisplay = (
		<>
			{/* header of placement box */}
			{
				<span className='quotation-item'>
					<span className='quotation-badge'>
						<span className='badge-left'> Reinsurer Quoter 1 </span>
						{index === 0 ? (
							<span className='badge-right'> Lead Reinsurer </span>
						) : null}
					</span>
					<span className='quotation-bar'>
						<span
							className='quotation-proportion'
							style={{ width: allocation + '%' }}
						>
							{' '}
						</span>
						<span className='quotation-percent'>{allocation}%</span>
					</span>
				</span>
			}
		</>
	)

	return <>{viewDisplay}</>
}

AllocationItem.propTypes = {
	allocation: PropTypes.number,
	index: PropTypes.number
}

export default AllocationItem
