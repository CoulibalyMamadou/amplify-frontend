import './constraint-item.scss'
import ConstraintTypeBorder from './constraint-type-border/constraint-type-border'
import ConstraintTypeExclude from './constraint-type-exclude/constraint-type-exclude'
import * as PropTypes from 'prop-types'
import { getProgramLayersByIdFill } from '../../../../../../../api/program.service'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { TiDeleteOutline } from 'react-icons/all'

/**
 * Constraint item edit component
 * @param id constraint index
 * @param type constraint type
 * @param groupName constraint group name
 * @param onChanged constraint update
 * @param defaultConstraint constraint default value
 * @param onRemoved constraint removed
 * @returns {JSX.Element}
 * @constructors
 */
const ConstraintItem = ({
	id,
	type,
	groupName,
	onChanged,
	defaultConstraint,
	onRemoved
}) => {
	let displayView = ''

	/**
	 * Targeted Program Id
	 */
	const { programId } = useParams()

	/**
	 * Loader
	 */
	const [isLoading, setIsLoading] = useState(true)

	/**
	 * Layer list
	 */
	const [layerList, setLayerList] = useState([])

	/**
	 * Get all insurer list
	 * @returns {Promise<T | void>}
	 */
	const getLayersList = () => {
		return getProgramLayersByIdFill(programId)
			.then((res) => res.json())
			.then((allLayer) => {
				setLayerList(allLayer)
				setIsLoading(false)
				console.log('allLayer : ', allLayer)
				return allLayer
			})
			.catch((reason) => {
				console.log('reason : ', reason)
			})
	}

	useEffect(() => {
		getLayersList().then((value) => {
			console.log('allInsurer : ', value)
			console.log('layerList : ', layerList)
		})
		return () => {
			setLayerList([])
		}
	}, [])

	/**
	 * Update constraint item
	 * @param constraint new value
	 */
	const onUpdate = (constraint) => {
		onChanged(id, constraint)
		console.log('constraint id : ', id)
		console.log('constraint item : ', constraint)
	}

	/**
	 * remove constraint item
	 */
	const onRemove = () => {
		onRemoved(id)
	}

	/**
	 * Render related to type
	 */
	switch (type) {
		case 'interval':
			displayView = (
				<ConstraintTypeBorder
					groupName={groupName}
					isLoading={isLoading}
					onChanged={onUpdate}
					defaultConstraint={defaultConstraint}
					layerList={layerList.layers}
				/>
			)
			break
		case 'exclude':
			displayView = <ConstraintTypeExclude />
			break
		default:
			displayView = <span> </span>
			break
	}

	/**
	 * Set content bloc for constraint item
	 */
	return isLoading ? (
		<div> </div>
	) : (
		<>
			<section className={'constraint-row'}>
				{displayView}

				<span className='delete-badge-constraints '>
					<TiDeleteOutline
						onClick={onRemove}
						size='1.4em'
						color='red'
						cursor='pointer'
					/>
				</span>
			</section>
		</>
	)
}

/**
 * Constraint item parameter type
 * @type {{groupName: Requireable<string>, defaultConstraint: Requireable<object>, onChanged: Requireable<(...args: any[]) => any>, id: Requireable<number>, onRemoved: Requireable<(...args: any[]) => any>, type: Requireable<string>}}
 */
ConstraintItem.propTypes = {
	id: PropTypes.number,
	type: PropTypes.string,
	defaultConstraint: PropTypes.object,
	onChanged: PropTypes.func,
	groupName: PropTypes.string,
	onRemoved: PropTypes.func
}

export default ConstraintItem
