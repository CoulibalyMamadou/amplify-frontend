import './documents.scss'
import { BsDownload } from 'react-icons/bs'
import * as PropTypes from 'prop-types'

const Documents = ({ program }) => {
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
				onClick={(event) => downloadDoc(event, document)}
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

	const downloadDoc = (event, doc) => {
		event.preventDefault()
		const link = document.createElement('a')
		link.href = doc.path
		link.setAttribute('download', `${doc.title}.${doc.extension}`)
		console.log(link)
		document.body.appendChild(link)
		link.click()
		link.parentNode.removeChild(link)
	}

	return (
		<section className='document'>
			<section className='display-modify'>
				<h3>Documents</h3>
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
