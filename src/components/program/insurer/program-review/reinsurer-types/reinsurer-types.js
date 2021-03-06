import './reinsurer-types.scss'
import { FaPen } from 'react-icons/fa'
import * as PropTypes from 'prop-types'

const ReinsurerTypes = ({ handleClick, quoterList, program }) => {
	return (
		<section className='reinsurer-type'>
			<section className='display-modify'>
				<h3>Reinsurer types</h3>
				{program.status === 'UNCOMPLETE' ? (
					<FaPen
						className='faPen'
						id='DOCUMENT'
						data-testid='DOCUMENT'
						onClick={handleClick}
					/>
				) : (
					<div></div>
				)}
			</section>
			<section className='dysplay-reinsurer-type'>
				<div>
					<h4>Quoters</h4>

					{quoterList.quoterList &&
						quoterList.quoterList.quoter.map((quoter, index) => {
							return (
								<ul key={index}>
									<li>{quoter.name}</li>
								</ul>
							)
						})}
				</div>
				<div>
					<h4>Followers</h4>
					{quoterList.quoterList &&
						quoterList.quoterList.follower.map((follower, index) => {
							return (
								<ul key={index}>
									<li>{follower.name}</li>
								</ul>
							)
						})}
				</div>
				{/* <div>
					<h4>Excluded</h4>
				</div> */}
			</section>
		</section>
	)
}

ReinsurerTypes.propTypes = {
	handleClick: PropTypes.func,
	quoterList: PropTypes.object,
	program: PropTypes.object
}

export default ReinsurerTypes
