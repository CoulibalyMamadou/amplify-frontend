import './allocation-header.scss'
import { FaInfo } from 'react-icons/fa'
import AllocationConstraintInfo from './allocation-constraint-info/allocation-constraint-info'
import { useEffect, useState, useRef } from 'react'
import * as PropTypes from 'prop-types'

const AllocationHeader = ({
	listConstraint = [],
	insurer = {},
	office = {},
	layers = []
}) => {
	const [constraintList, setConstraintList] = useState(listConstraint)
	const [reinsurerConstraint, setReinsurerConstraint] = useState([])

	console.log('setConstraintList header : ', constraintList)
	console.log('reinsurerConstraint  id : ', insurer)
	console.log('reinsurerConstraint office id : ', office)
	console.log('reinsurerConstraint for data constraint : ', reinsurerConstraint)
	console.table(reinsurerConstraint)

	useEffect(() => {
		updateReinsurerConstraint()
	}, [constraintList])

	useEffect(() => {
		setConstraintList(listConstraint)
		// updateReinsurerConstraint()
	}, [listConstraint])

	const updateReinsurerConstraint = () => {
		const listConstraint = constraintList.filter((constraint, index) =>
			constraint.groupOffice.offices.includes(insurer.office)
		)
		setReinsurerConstraint((prevState) => [...listConstraint])
	}

	const tooltipReinsurer = useRef(null)
	const [isActive, setIsActive] = useState(false)
	const onClick = () => setIsActive(!isActive)
	useEffect(() => {
		const pageClickEvent = (e) => {
			// If the active element exists and is clicked outside of
			if (
				tooltipReinsurer.current !== null &&
				!tooltipReinsurer.current.contains(e.target)
			) {
				setIsActive(!isActive)
			}
		}
		// If the item is active (ie open) then listen for clicks
		if (isActive) {
			window.addEventListener('click', pageClickEvent)
		}
		return () => {
			window.removeEventListener('click', pageClickEvent)
		}
	}, [isActive])

	return (
		<>
			<div
				style={{
					display: 'flex',
					width: '100%',
					justifyContent: 'space-between'
				}}
			>
				<section className='allocation-header'>
					<h1 className='header-title'>Allocation constraints</h1>
					{constraintList.length > 0 ? (
						<AllocationConstraintInfo
							listConstraint={constraintList}
							insurer={insurer.firstName + ' ' + insurer.lastName}
							office={office.name}
							layers={layers}
						/>
					) : (
						<p>No constraints defined for you for this program</p>
					)}
				</section>
				<button className='action-button' onClick={onClick}>
					<FaInfo />
				</button>
				<nav
					style={{
						top: '38%',
						height: 'auto',
						width: '55%',
						left: 'auto',
						right: '11%'
					}}
					id=' '
					ref={tooltipReinsurer}
					className={`menu ${isActive ? 'active' : 'inactive'}`}
				>
					<br />
					<p style={{ textAlign: 'left', margin: '0 10px' }}>
						<span>
							On this page, you can see the allocation settings selected by the
							cedent, and can also configure your own allocation settings.{' '}
							<br />
							<br />
							<strong>Equal share allocation</strong>
							<br />
							Check the box to get the same share (in %) on each layer.
							<br />
							<br />
							<strong>Maximum share</strong>
							<br />
							Your share will not exceed the percentage entered. This constraint
							can be applied globally to the whole program, or on different
							layers.
							<br />
							<br />
							<strong>Conditional minimum share</strong>
							<br />
							Your share will exceed the percentage entered. This constraint can
							be applied globally to the whole program, or on different layers.
							<br /> It is conditional to your quotation being below final
							market price, and is to be understood in the sense “if my share is
							below this level, then I do not want to be signed on the program
							(or on the layer)”.
							<br />
							<br />
							<strong>Relative maximum share</strong>
							<br />
							Available only if Equal share allocation is unchecked. Your
							allocation on the selected layer, relative to your global
							allocation on the program, will not exceed the percentage entered.
							<br />
							<br />
							<strong>Relative minimum share</strong>
							<br />
							Available only if Equal share allocation is unchecked. Your
							allocation on the selected layer, relative to your global
							allocation on the program, will exceed the percentage entered.
							<br />
						</span>
					</p>
					<br />
				</nav>
			</div>
		</>
	)
}

AllocationHeader.propTypes = {
	listConstraint: PropTypes.array,
	layers: PropTypes.array,
	insurer: PropTypes.object,
	office: PropTypes.object
}

export default AllocationHeader
