import './update-user-profile-program-home.scss'
import { PROGRAM_TYPE_OPTIONS_USER } from '../../../../../constants'
import Input from '../../../../form-component/Input/Input'
import Select from '../../../../form-component/Select/Select'
import * as PropTypes from 'prop-types'

const UpdateUserProfileProgramHome = ({ user = {} }) => {
	/**
	 * Describe structure for generate form component
	 * @type {{lineOfBusiness: {valid: boolean, touched: boolean, elementConfig: {optGroup: [{options, label: string}, {options, label: string}, {options: [{displayValue: string, value: string}], label: string}]}, name: string, label: string, elementType: string, value: string}, riskStructure: {valid: boolean, touched: boolean, elementConfig: {optGroup: [{options: [{displayValue: string, value: string}, {displayValue: string, value: string}, {displayValue: string, disabled: boolean, value: string}], label: string}, {options: [{displayValue: string, disabled: boolean, value: string}, {displayValue: string, disabled: boolean, value: string}], label: string}]}, name: string, label: string, elementType: string, value: string}, limit: {valid: boolean, touched: boolean, elementConfig: {min: number, step: number, placeholder: number, type: string}, name: string, label: string, elementType: string, value: number}, title: {valid: boolean, touched: boolean, elementConfig: {placeholder: string, type: string}, name: string, label: string, elementType: string, value: string}, type: {valid: boolean, touched: boolean, elementConfig: {options: [{displayValue: string, value: string}, {displayValue: string, value: string}]}, name: string, label: string, elementType: string, value: string}}}
	 */
	const programStructure = {
		firstName: {
			name: 'firstName',
			label: 'First Name',
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'First Name',
				disabled: true
			},
			value: user.firstName,
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		},
		company: {
			name: 'company',
			label: 'Company',
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Company'
			},
			value: '',
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		},
		email: {
			name: 'email',
			label: 'Email Address',
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'email address',
				disabled: true
			},
			value: user.email,
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		},
		currentPassword: {
			name: 'currentPassword',
			label: 'Current Password',
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'current password',
				disabled: true
			},
			value: user.password,
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		}
	}

	const userFormGrid2 = {
		lastName: {
			name: 'lastName',
			label: 'Last Name',
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Last name',
				disabled: true
			},
			value: user.lastName,
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		},
		office: {
			name: 'office',
			label: 'Office',
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Office',
				disabled: true
			},
			value: user.office,
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		},
		phone: {
			name: 'phone',
			label: 'Phone',
			elementType: 'input',
			elementConfig: {
				type: 'number',
				placeholder: 'phone',
				disabled: true
			},
			value: '',
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		},
		newPassword: {
			name: 'NewPassword',
			label: 'New Password',
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'New Password',
				disabled: true
			},
			value: '',
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		},
		confirmPassword: {
			name: 'ConfirmPassword',
			label: 'Confirm New Password',
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Confirm New Password',
				disabled: true
			},
			value: '',
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		}
	}
	const userFormGrid3 = {
		position: {
			name: 'position',
			label: 'Position',
			elementType: 'select',
			elementConfig: PROGRAM_TYPE_OPTIONS_USER,
			value: '',
			// validation: {
			//     required: true
			// },
			valid: false,
			touched: false
		}
	}

	// use state for this declaration
	const formElementsArray = []
	const userFormElementsArrayGrid2 = []
	const userFormElementsArrayGrid3 = []
	for (const key in programStructure) {
		// console.log('program key : ', key)
		formElementsArray.push({
			id: key,
			config: programStructure[key]
		})
	}
	for (const key in userFormGrid2) {
		// console.log('program key : ', key)
		userFormElementsArrayGrid2.push({
			id: key,
			config: userFormGrid2[key]
		})
	}
	for (const key in userFormGrid3) {
		// console.log('program key : ', key)
		userFormElementsArrayGrid3.push({
			id: key,
			config: userFormGrid3[key]
		})
	}
	const updated = (id, value) => {}

	/**
	 * View of procedural generation of form
	 * @type {unknown[]}
	 */
	const displayView = formElementsArray.map((formElement) => {
		switch (formElement.config.elementType) {
			case 'input':
				return (
					<Input
						key={formElement.id}
						id={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						value={formElement.config.value}
						elementConfig={formElement.config.elementConfig}
						changed={updated}
					/>
				)
			case 'select':
				return (
					<Select
						key={formElement.id}
						id={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						elementConfig={formElement.config.elementConfig}
						changed={updated}
					/>
				)
			default:
				return (
					<Input
						key={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						elementConfig={formElement.config.elementConfig}
						changed={updated}
					/>
				)
		}
	})
	const displayViewGrid2 = userFormElementsArrayGrid2.map((formElement) => {
		switch (formElement.config.elementType) {
			case 'input':
				return (
					<Input
						key={formElement.id}
						id={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						value={formElement.config.value}
						elementConfig={formElement.config.elementConfig}
						changed={updated}
					/>
				)
			case 'select':
				return (
					<Select
						key={formElement.id}
						id={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						elementConfig={formElement.config.elementConfig}
						changed={updated}
					/>
				)
			default:
				return (
					<Input
						key={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						elementConfig={formElement.config.elementConfig}
						changed={updated}
					/>
				)
		}
	})
	const displayViewGrid3 = userFormElementsArrayGrid3.map((formElement) => {
		switch (formElement.config.elementType) {
			case 'input':
				return (
					<Input
						key={formElement.id}
						id={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						value={formElement.config.value}
						elementConfig={formElement.config.elementConfig}
						changed={updated}
					/>
				)
			case 'select':
				return (
					<Select
						key={formElement.id}
						id={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						elementConfig={formElement.config.elementConfig}
						changed={updated}
					/>
				)
			default:
				return (
					<Input
						key={formElement.id}
						name={formElement.config.name}
						label={formElement.config.label}
						elementConfig={formElement.config.elementConfig}
						changed={updated}
					/>
				)
		}
	})

	/**
	 * Set content bloc for home program
	 */
	return (
		<form>
			<div className='form-row' style={{ display: 'flex' }}>
				<div className='user-form' style={{ width: '30%', margin: '0 2%' }}>
					{displayView}
				</div>
				<div className='user-form' style={{ width: '33%', margin: '0 2%' }}>
					{displayViewGrid2}
				</div>
				<div className='user-form' style={{ width: '30%', margin: '0 2%' }}>
					{displayViewGrid3}
				</div>
			</div>
			{/* <section className=''>
				 <button className='action-button' onClick={showToast}>
                         <img
                             src={add}
                             alt='Supporting documents'
                             className='action-img'
                         />
                         showToast
                     </button> 
			</section> */}
		</form>
	)
}
/**
 * Program parameter type
 * @type {{programInfoStructureData: Requireable<any[]>, programFieldChangedHandler: Requireable<(...args: any[]) => any>}}
 */
UpdateUserProfileProgramHome.propTypes = {
	user: PropTypes.object,
	userFieldChangedHandler: PropTypes.func
}
export default UpdateUserProfileProgramHome
