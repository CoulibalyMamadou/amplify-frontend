/**
 * Init structure for form render
 * @returns {{}}
 */
export const initializeProgramStructure = (programStructure) => {
	const formElementsArray = []
	let program = {}
	for (const key in programStructure) {
		formElementsArray.push({
			id: key,
			config: programStructure[key]
		})
		program = {
			...program,
			[key]: {
				value: '',
				valid: false,
				touched: false
			}
		}
	}
	return program
	// return [formElementsArray, program]
}
