// Importing helper modules
import { DarkModeContext } from 'App'
import { Storage } from 'aws-amplify'
import { toast } from 'react-toastify'
import React, { useContext, useRef, useState } from 'react'

// Importing core components
import Button from 'components/ui/Button'

interface ImageUploaderProps {
	label: string
	value: string
	accept?: string
	btnText?: string
	setValue: (val: string) => void
}

const ImageUploader: React.FC<ImageUploaderProps> = (props) => {
	// DarkMode Context
	const { darkMode } = useContext(DarkModeContext)

	// Upload element
	const uploader = useRef<null | HTMLInputElement>(null)

	// Ui state
	const [loading, setLoading] = useState<boolean>(false)

	function handler(files: any) {
		if (files.length) {
			const file = files[0]
			setLoading(true)
			toast
				.promise(
					Storage.put(
						`${(Math.random() * 1000).toFixed(0)}-${file.name}`,
						file,
						{
							level: 'public',
						}
					),
					{
						success: 'File attached successfully',
						pending: 'Uploading file...',
						error: 'Something went wrong',
					}
				)
				.then((res) => props.setValue(`public/${res.key}`))
				.finally(() => setLoading(false))
		}
	}

	function removeImage() {
		Storage.remove(props.value.replace('public/', ''))
			.then(() => props.setValue(''))
			.catch((error: any) => {
				toast.error(error.message)
			})
	}

	return (
		<div className="mb-5">
			<label
				className={`text-sm mb-5 ${
					darkMode ? 'text-gray-200 font-light' : 'text-gray-700 font-normal'
				}`}
			>
				{props.label}
			</label>
			<input
				type="file"
				accept={props.accept ? props.accept : 'image/*'}
				className="hidden"
				ref={(el) => (uploader.current = el)}
				onChange={(e) => {
					handler(e.target.files)
					e.target.value = ''
				}}
			/>
			<div
				className={`border-[1.5px] p-1 border-gray-400 flex mt-4 rounded-sm items-center gap-1`}
			>
				<div className="w-36">
					<Button
						title={
							loading
								? 'Uploading'
								: props.btnText
								? props.btnText
								: 'Attach Image'
						}
						icon={<i className="icofont-upload-alt"></i>}
						color="primary"
						disabled={loading}
						loading={loading}
						fullWidth
						clicked={() => uploader.current?.click()}
					/>
				</div>
				<div
					className={`flex-1 flex items-center justify-between py-2 px-1 ${
						darkMode ? 'bg-[#262e3d]' : 'bg-[#e3e6ea]'
					}`}
				>
					<p
						className={`text-sm ${
							darkMode
								? 'text-gray-200 font-light'
								: 'text-gray-700 font-normal'
						}`}
					>
						File Attached:{' '}
						{props.value ? props.value.replace('public/', '') : 'N/A'}
					</p>
					<div
						onClick={removeImage}
						className={`h-5 w-5 rounded-full duration-300 center bg-gray-50 cursor-pointer group hover:bg-red-700 ${
							props.value ? 'opacity-100' : 'opacity-0'
						}`}
					>
						<i className="icofont-close duration-300 text-red-500 group-hover:text-white"></i>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ImageUploader
