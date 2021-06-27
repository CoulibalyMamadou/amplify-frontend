import React, { useEffect, useRef, useState } from 'react'
import './DropdownMultiple.scss'
import * as PropTypes from 'prop-types'
import { BsCheck, IoIosArrowDown, IoIosArrowUp } from 'react-icons/all'
// import { BsArrowDown, BsArrowUp, BsCheck } from 'react-icons/all'
import { pluralize } from 'jest-matcher-utils'

const DropdownMultiple = ({
	id,
	styles,
	title,
	titleSingular,
	titlePlural,
	list,
	name,
	onChange,
	closeOnSelection,
	searchable,
	select,
	checkIcon,
	arrowUpIcon,
	arrowDownIcon
}) => {
	// const { id, searchable, arrowUpIcon, arrowDownIcon, styles } = this.props

	const [isListOpen, setIslistOpen] = useState(false)
	const [titles, setTitle] = useState('')
	const [keyword, setKeyword] = useState('')
	const [selectedItems, setSelectedItems] = useState([])
	// const [listsItems, setListItems] = useState([])

	const [item, setItem] = useState(null)
	const searchField = useRef('')

	// title,
	// list

	// console.log('Is this keyword : ', keyword)
	// console.log('Is this titles : ', titles)
	// // console.log('Is this searchField : ', listsItems)
	// console.log('Is this searchField : ', searchField)
	console.log('Is this list : ', item)
	console.log('Is this list Open : ', isListOpen)
	// console.log('Is this list Open : ', selectedItems)

	const {
		wrapper,
		header,
		headerTitle,
		headerArrowUpIcon,
		headerArrowDownIcon,
		listItem,
		// 	lists,
		listSearchBar,
		scrollList
	} = styles

	// useEffect(() => {
	// setTimeout(() => {
	// 	if (isListOpen) {
	// 		window.addEventListener('click', close)
	// 	} else {
	// 		window.removeEventListener('click', close)
	// 	}
	// }, 0)
	// 	// console.log('component updated!')
	// })

	useEffect(() => {
		if (select.length) {
			selectMultipleItems(select)
		}
		// console.log('component mounted!')

		// return a function to execute at unmount
		return () => {
			window.removeEventListener('click', close)
			// console.log('component will unmount')
		}
	}, [])

	useEffect(() => {
		handleTitle()
		onChange(selectedItems, name)
	}, [selectedItems])

	useEffect(() => {
		if (isListOpen && searchField.current) {
			searchField.current.focus()
			setKeyword('')
		}
	}, [isListOpen])

	// useEffect(() => {
	// 	if (isListOpen && searchField.current) {
	// 		searchField.current.focus()
	// 		setKeyword('')
	// 	}
	// 	handleSelection(item, selectedItems)
	// }, [isListOpen, item])

	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	const { list } = nextProps

	// 	if (JSON.stringify(list) !== JSON.stringify(prevState.list)) {
	// 		return { list }
	// 	}
	//
	// 	return null
	// }

	// const selectAll = () => {
	// 	setSelectedItems((prevState) => [...prevState])
	// }

	const close = () => {
		setIslistOpen(false)
	}

	// const deselectAll = () => {
	// 	setSelectedItems([])
	// }

	const selectMultipleItems = (items) => {
		items.forEach((item) => {
			const selectedItem = list.find((i) => i.value === item.value)
			setTimeout(() => {
				selectItem(selectedItem, true)
			})
		})
	}

	const handleSelection = (item, selectedItems) => {
		const index = selectedItems.findIndex((i) => i.value === item.value)

		if (index !== -1) {
			const selectedItemsCopy = [...selectedItems]
			selectedItemsCopy.splice(index, 1)
			setSelectedItems(() => selectedItemsCopy)
		} else {
			setSelectedItems((prevState) => [...prevState, item])
		}
	}

	const handleTitle = () => {
		const length = selectedItems.length

		if (!length) {
			setTitle(title)
		} else if (length === 1) {
			setTitle(`${length} ${titleSingular}`)
		} else if (titlePlural) {
			setTitle(`${length} ${titlePlural}`)
		} else {
			const pluralizedTitle = pluralize(titleSingular, length)
			setTitle(`${length} ${pluralizedTitle}`)
		}
	}

	const selectItem = (item, noCloseOnSelection = false) => {
		setIslistOpen((!noCloseOnSelection && !closeOnSelection) || false)

		setItem(item)
		handleSelection(item, selectedItems)
	}

	const filterList = (e) => {
		setKeyword(e.target.value.toLowerCase())
	}

	const toggleList = () => {
		setIslistOpen((prevState) => !prevState)
	}

	const listItems = () => {
		// const { id, searchable, checkIcon, styles } = this.props
		// const { listItem, listItemNoResult } = styles
		// const { keyword, list, selectedItems } = this.state
		let tempList = [...list]
		if (keyword.length) {
			tempList = list.filter((item) =>
				item.label.toLowerCase().includes(keyword.toLowerCase())
			)
		}
		if (tempList.length) {
			return tempList.map((item, index) => (
				<li
					className={`dd-list-item ${id}`}
					style={listItem}
					key={index}
					// key={item.value}
					onClick={() => selectItem(item)}
				>
					{/* <img
						src='https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg'
						alt='User avatar'
					/> */}
					<span className={'item-title'}>{item.label} </span>
					{selectedItems.some((i) => i.value === item.value) && (
						<span className={'item-check'} style={styles.checkIcon}>
							{checkIcon || <BsCheck />}
						</span>
					)}
				</li>
			))
		}
		return (
			<div className={`dd-list-item no-result ${id}`}>
				{/* <div className={`dd-list-item no-result ${id}`} style={listItemNoResult}> */}
				{searchable[1]}
			</div>
		)
	}

	return (
		<div className={`dd-wrapper ${id}`} style={wrapper}>
			<button
				type='button'
				className={`dd-header `}
				style={header}
				onClick={toggleList}
			>
				<div className={`dd-header-title ${id}`} style={headerTitle}>
					{' '}
					{titles}{' '}
				</div>
				{isListOpen ? (
					<span style={headerArrowUpIcon}>
						{arrowUpIcon || <IoIosArrowUp />}
					</span>
				) : (
					<span style={headerArrowDownIcon}>
						{arrowDownIcon || <IoIosArrowDown />}
					</span>
				)}
			</button>
			{isListOpen && (
				<div
					role='list'
					// type='button'
					className={`dd-list ${searchable ? ' searchable' : ''} ${id}`}
					// style={list}
					onClick={(e) => e.stopPropagation()}
				>
					{searchable && (
						<input
							ref={searchField}
							className={`dd-list-search-bar ${id}`}
							style={listSearchBar}
							placeholder={searchable[0]}
							onChange={(e) => filterList(e)}
						/>
					)}
					<div className={`dd-scroll-list ${id}`} style={scrollList}>
						{listItems()}
					</div>
				</div>
			)}
		</div>
	)
}

DropdownMultiple.defaultProps = {
	id: '',
	select: [],
	closeOnSelection: false,
	titlePlural: undefined,
	searchable: undefined,
	styles: {},
	arrowUpIcon: null,
	arrowDownIcon: null,
	checkIcon: null
}

DropdownMultiple.propTypes = {
	id: PropTypes.string,
	styles: PropTypes.shape({
		wrapper: PropTypes.string,
		header: PropTypes.string,
		headerTitle: PropTypes.string,
		headerArrowUpIcon: PropTypes.string,
		headerArrowDownIcon: PropTypes.string,
		checkIcon: PropTypes.string,
		list: PropTypes.string,
		listSearchBar: PropTypes.string,
		scrollList: PropTypes.string,
		listItem: PropTypes.string,
		listItemNoResult: PropTypes.string
	}),
	title: PropTypes.string.isRequired,
	titleSingular: PropTypes.string.isRequired,
	titlePlural: PropTypes.string,
	list: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	closeOnSelection: PropTypes.bool,
	searchable: PropTypes.array,
	select: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired
		})
	),
	checkIcon: PropTypes.elementType,
	arrowUpIcon: PropTypes.elementType,
	arrowDownIcon: PropTypes.elementType
}

export default DropdownMultiple
