import './constraint-item.scss'
import ConstraintTypeBorder from './constraint-type-border/constraint-type-border'
import * as PropTypes from 'prop-types'
import ConstrainTypeEqualShare from './constraint-type-equal-share/constrain-type-equal-share'
import { TiDeleteOutline } from 'react-icons/all'

const ConstraintItem = ({
	id,
	type = 'interval',
	layers = [],
	defaultConstraint,
	isEqualShare = false,
	reinsurer = {},
	onChanged,
	onRemoved
}) => {
	let displayView = ''
	const onUpdate = (constraint) => {
		onChanged(id, constraint)
		console.log('Update level item')
	}

	const onRemove = () => {
		onRemoved(id)
	}

	switch (type) {
		case 'interval':
			displayView = (
				<ConstraintTypeBorder
					onChanged={onUpdate}
					defaultConstraint={defaultConstraint}
					layerList={layers}
					isEqualShare={isEqualShare}
					reinsurer={reinsurer}
				/>
			)
			break
		case 'equal':
			displayView = <ConstrainTypeEqualShare />
			break
		default:
			displayView = <span> </span>
			break
	}

	return (
		<>
			<section className={'constraint-row'}>
				{displayView}
				<span className='delete-badge'>
					<TiDeleteOutline
						onClick={onRemove}
						cursor='pointer'
						size='1.4em'
						color='red'
					/>
				</span>
			</section>
		</>
	)
}

ConstraintItem.propTypes = {
	id: PropTypes.number,
	type: PropTypes.string,
	layers: PropTypes.array,
	defaultConstraint: PropTypes.object,
	isEqualShare: PropTypes.bool,
	onChanged: PropTypes.func,
	reinsurer: PropTypes.string,
	onRemoved: PropTypes.func
}

export default ConstraintItem
