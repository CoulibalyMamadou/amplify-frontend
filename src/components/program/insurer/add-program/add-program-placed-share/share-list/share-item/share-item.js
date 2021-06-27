import './share-item.scss'
import { useEffect, useState } from 'react'
import Input from '../../../../../../form-component/Input/Input'
import * as PropTypes from 'prop-types'

const ShareItem = ({ index, changed = null, max, defaultValue = 0 }) => {
	const shareForm = {
		share: {
			name: 'share',
			label: `Layer ${index + 1} `,
			subLabel: 'Share (%)',
			elementType: 'input',
			elementConfig: {
				type: 'number',
				placeholder: '100',
				min: 0,
				max
			},
			value: defaultValue || 0,
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		}
	}

	const [share, setShare] = useState(0)

	useEffect(() => {
		changed(index, share)
	}, [share])

	const updateHandler = (inputIdentifier, inputValue) => {
		setShare(inputValue)
	}

	const formElementsArray = []
	for (const key in shareForm) {
		formElementsArray.push({
			id: key,
			config: shareForm[key]
		})
	}

	return (
		<>
			{formElementsArray.map((formElement) => {
				return (
					<Input
						id={formElement.config.name}
						key={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						subLabel={formElement.config.subLabel}
						value={formElement.config.value}
						elementConfig={formElement.config.elementConfig}
						changed={updateHandler}
					/>
				)
			})}
		</>
	)
}

ShareItem.propTypes = {
	index: PropTypes.number,
	max: PropTypes.number,
	defaultValue: PropTypes.number,
	changed: PropTypes.func
}

export default ShareItem
