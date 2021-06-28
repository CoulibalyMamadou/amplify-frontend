import './documents.scss'
import { BsDownload } from 'react-icons/bs'
import { FaPen } from 'react-icons/fa'
import * as PropTypes from 'prop-types'

const Documents = ({ program, handleClick }) => {
	/**
	 * Display document on the screen
	 * @param {*} document
	 * @returns
	 */
	const displayDocument = (document) => {
		const extension = document.extension
		const className = []

		if (extension === 'pdf') {
			className.push('pdfDoc')
		}
		if (extension === 'xlsx') {
			className.push('xlsxDoc')
		}
		if (extension === 'doc') {
			className.push('docDoc')
		}

		return (
			<span
				className={`${className}`}
				onClick={(event) => downloadDocuments(event, document)}
			>
				<BsDownload />
			</span>
		)
	}

	/**
	 * Download a document
	 * @param {*} event
	 * @param {*} doc
	 */

	// const downloadDoc = (event, doc) => {
	// 	event.preventDefault()
	// 	const url = URL.createObjectURL([doc.path])
	// 	console.log(url)
	// 	const link = document.createElement('a')

	// 	link.href = url
	// 	link.id = 'url'
	// 	link.target = '_blank'
	// 	link.setAttribute('download', `${doc.title}.${doc.extension}`)
	// 	// console.log(link)
	// 	document.body.appendChild(link)
	// 	link.click()
	// 	link.parentNode.removeChild(link)
	// }
	// https://cors-anywhere.herokuapp.com/
	const downloadDocuments = (event, doc) => {
		event.preventDefault()
		fetch('https://cors-anywhere.herokuapp.com/' + `${doc.path}`, {
			method: 'GET',
			headers: {
				'Content-Type': `application/${doc.extension}`
			}
		})
			.then((response) => response.blob())
			.then((blob) => {
				// Create blob link to download
				const url = window.URL.createObjectURL(new Blob([blob]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', `${doc.title}.${doc.extension}`)

				// Append to html link element page
				document.body.appendChild(link)

				// Start download
				link.click()

				// Clean up and remove the link
				link.parentNode.removeChild(link)
			})
	}

	return (
		<section className='document'>
			<section className='display-modify'>
				<h3>Documents</h3>
				<FaPen
					className='faPen'
					id='DOCUMENT'
					data-testid='DOCUMENT'
					onClick={handleClick}
				/>
			</section>
			<section className='display-document'>
				{program.document.map((document, index) => {
					return (
						<span key={index}>
							{displayDocument(document)}

							<h5>
								{document.title}.{document.extension}
							</h5>
						</span>
					)
				})}
			</section>
		</section>
	)
}

Documents.propTypes = {
	program: PropTypes.object,
	handleClick: PropTypes.func
}

export default Documents
