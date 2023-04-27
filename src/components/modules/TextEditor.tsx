// Importing helper modules

// Importing helepr modules
import { DarkModeContext } from 'App'
import { Storage } from 'aws-amplify'
import { generateUrl } from 'utils/modules'
import { toast } from 'react-toastify'
import { useCallback, useContext, useMemo, useRef, useState } from 'react'

// Importing core components
import ReactQuill from 'react-quill'

// Importing styles
import 'react-quill/dist/quill.snow.css'

interface TextEditorProps {
	label: string
	value: string
	readOnly: boolean
	setValue: (val: string) => void
}

const TextEditor: React.FC<TextEditorProps> = (props) => {
	// DarkMode Context
	const { darkMode } = useContext(DarkModeContext)

	// Editor ref
	const quill = useRef<any>(null)
	const [readOnly, setReadOnly] = useState<boolean>(false)

	const imageHandler = useCallback(async () => {
		const input = document.createElement('input')
		input.setAttribute('type', 'file')
		input.setAttribute('accept', 'image/*')
		input.click()

		input.onchange = async () => {
			if (!input.files?.length) return
			const file = input.files[0]
			if (file) {
				setReadOnly(true)
				toast
					.promise(
						Storage.put(
							`wdn-${(Math.random() * 1000).toFixed(0)}-${file.name}`,
							file
						),
						{
							success: 'Image attached successfully',
							error: 'Something went wrong',
							pending: 'Uploading image ...',
						}
					)
					.then((res) => {
						let image = generateUrl(`public/${res.key}`)
						let editor = quill.current.getEditor()
						const range = quill.current.getEditorSelection('focus', 'true')
						editor.insertEmbed(range.index, 'image', image)
					})
					.finally(() => setReadOnly(false))
			}
		}
	}, [])

	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					[{ header: [2, 3, 4, false] }],
					['bold', 'italic', 'underline', 'blockquote'],
					[{ color: [] }],
					[
						{ list: 'ordered' },
						{ list: 'bullet' },
						{ indent: '-1' },
						{ indent: '+1' },
					],
					['link', 'image'],
					['clean'],
				],
				handlers: {
					image: imageHandler,
				},
			},
			clipboard: {
				matchVisual: true,
			},
		}),
		[imageHandler]
	)

	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'color',
		`clean`,
	]

	return (
		<div>
			<label
				className={`text-sm mb-5 ${
					darkMode ? 'text-gray-200 font-light' : 'text-gray-700 font-normal'
				}`}
			>
				{props.label}
			</label>
			<div className="mt-4">
				<ReactQuill
					ref={(el) => (quill.current = el)}
					theme="snow"
					placeholder={'Start from here..'}
					value={props.value}
					onChange={(newValue) => props.setValue(newValue)}
					formats={formats}
					modules={modules}
					readOnly={readOnly || props.readOnly}
					className={darkMode ? 'editorDark' : 'editorLight'}
				/>
			</div>
		</div>
	)
}

export default TextEditor
