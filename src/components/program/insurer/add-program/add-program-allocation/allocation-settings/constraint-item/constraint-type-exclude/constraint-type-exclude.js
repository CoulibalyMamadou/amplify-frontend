import './constraint-type-exclude.scss'
import { MdClose } from 'react-icons/all'

/**
 *  Constraint type exclude edit component
 * @returns {JSX.Element}
 * @constructor
 */
const ConstraintTypeExclude = () => {
	/**
	 * Render bloc
	 */
	return (
		<section className='constraint-box'>
			{/* constrain parameter */}
			<section className='constraint-settings'>
				{/* selected group target for constrain */}
				<span className='constraint-group'>
					<MdClose size='.8em' />
					<p>All Reinsurer Group</p>
				</span>
				{/* constrain type */}
				<label className='label'>
					<div className='toggle'>
						<input
							className='toggle-state'
							type='checkbox'
							name='check'
							value='check'
						/>
						<div className='indicator'> </div>
					</div>
					<div className='label-text'>no more emails plz</div>
				</label>
			</section>
			{/* constrain explanation */}
			<p className='constraint-explanation'>
				A single reinsurer cannot obtain more than a 40% share of the program
			</p>
		</section>
	)
}

export default ConstraintTypeExclude
