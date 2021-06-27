import './ask-item.scss'
import * as PropTypes from 'prop-types'

const AskItem = ({ fromInsurer = false }) => {
	return (
		<>
			{fromInsurer ? (
				<span className='ask-body'>My question</span>
			) : (
				<span className='ask-body right'>My question</span>
			)}
			{/* <div className="ask-body">
            </div> */}
		</>
	)
}

AskItem.propTypes = {
	fromInsurer: PropTypes.bool
}

export default AskItem
