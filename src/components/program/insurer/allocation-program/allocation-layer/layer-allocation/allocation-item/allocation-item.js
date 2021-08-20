import './allocation-item.scss'
import * as PropTypes from 'prop-types'
import { useState } from 'react'
import { GrUserSettings } from 'react-icons/all'

const AllocationItem = ({ allocation, index, setLead, leadOffice = '' }) => {
	const [isActive, setIsActive] = useState(false)

	const setLeadInsurer = () => {
		setLead(allocation.idOffice)
	}
	return (
		<>
			{/* header of placement box */}
			{
				<>
					<span
						className='quotation-item'
						onClick={() => setIsActive(!isActive)}
					>
						<span className='quotation-badge'>
							<span className='badge-left'>
								{allocation.name} {/* Reinsurer Quoter 1 */}
							</span>
							{leadOffice === allocation.idOffice ? (
								<span className='badge-right'> Lead Reinsurer </span>
							) : null}
						</span>
						<span className='quotation-bar'>
							<span
								className='quotation-proportion'
								style={{ width: allocation.share.toFixed(3) + '%' }}
							>
								{' '}
							</span>
							<span className='quotation-percent'>
								{allocation.share.toFixed(1)}%
							</span>
						</span>
					</span>
					<div className='item-option' onClick={() => setIsActive(!isActive)}>
						<nav className={`menu ${isActive ? 'active' : 'inactive'}`}>
							<ul>
								<li className='flex'>
									<span onClick={setLeadInsurer}>
										<GrUserSettings size={'1em'} /> &nbsp; &nbsp;&nbsp; &nbsp;
										<p className='center'>lead reinsurer</p>
									</span>
								</li>
							</ul>
						</nav>
					</div>
				</>
			}
		</>
	)
}

AllocationItem.propTypes = {
	allocation: PropTypes.object,
	// allocation: PropTypes.number,
	index: PropTypes.number,
	leadOffice: PropTypes.string,
	setLead: PropTypes.func
}

export default AllocationItem
