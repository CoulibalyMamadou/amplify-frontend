// import React, { useState } from 'react'
import './add-program-document.scss'
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

/**
 * Document for program Component
 * @returns {JSX.Element}
 * @constructor
 */
const AddProgramDocument = () => {
	// Create new plugin instance
	/* const defaultLayoutPluginInstance = defaultLayoutPlugin(); */

	/* 	// for onchange event
	const [pdfFile, setPdfFile] = useState(null)
	const [pdfFileError, setPdfFileError] = useState('')

	// for submit event
	const [viewPdf, setViewPdf] = useState(null)

	// onchange event
	const fileType = ['application/pdf']
	const handlePdfFileChange = (e) => {
		const selectedFile = e.target.files[0]
		if (selectedFile) {
			if (selectedFile && fileType.includes(selectedFile.type)) {
				const reader = new FileReader()
				reader.readAsDataURL(selectedFile)
				reader.onloadend = (e) => {
					setPdfFile(e.target.result)
					setPdfFileError('')
				}
			} else {
				setPdfFile(null)
				setPdfFileError('Please select valid pdf file')
			}
		} else {
			console.log('select your file')
		}
	}

	// form submit
	const handlePdfFileSubmit = (e) => {
		e.preventDefault()
		if (pdfFile !== null) {
			setViewPdf(pdfFile)
		} else {
			setViewPdf(null)
		}
	} */

	return (
		<>
			{/* <section className='add-placement-content'>
				{' '}
				<div className='container'>
					<br></br>

					<form className='form-group' onSubmit={handlePdfFileSubmit}>
						<input
							type='file'
							className='form-control'
							required
							onChange={handlePdfFileChange}
						/>
						{pdfFileError && <div className='error-msg'>{pdfFileError}</div>}
						<br></br>
						<button type='submit' className='btn btn-success btn-lg'>
							UPLOAD
						</button>
					</form>
					<br></br>
					<h4>Voir PDF</h4>
					<div className='pdf-container'>{viewPdf}</div>
				</div>
			</section> */}
		</>
	)
}

export default AddProgramDocument
