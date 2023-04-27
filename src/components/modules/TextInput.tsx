// Importing helper modules
import { DarkModeContext } from 'App'
import { ReactElement, useContext } from 'react'

interface Props {
	label: string
	value: string
	maxLength?: number
	setValue: (val: string) => void
	placeholder?: string
	disabled?: boolean
	icon?: ReactElement | null
	type?: 'text' | 'email' | 'password' | 'number'
}

const TextInput: React.FC<Props> = (props) => {
	// DarkMode context
	const { darkMode } = useContext(DarkModeContext)

	return (
		<div className="mb-5">
			<label
				className={`text-sm mb-5 ${
					darkMode ? 'text-gray-200 font-light' : 'text-gray-700 font-normal'
				}`}
			>
				{props.label}
			</label>
			<div
				className={`border-[1.5px] border-gray-400 flex mt-4 rounded-sm ${
					props.disabled
						? `${
								darkMode
									? 'bg-gray-600 bg-opacity-20'
									: ' bg-gray-300 bg-opacity-25'
						  }`
						: 'bg-inherit'
				}`}
			>
				<input
					type={props.type ? props.type : 'text'}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						props.setValue(e.target.value)
					}
					className={` w-full py-3 px-4  focus:outline-none text-sm bg-inherit ${
						darkMode ? 'text-gray-200' : 'text-gray-700'
					} `}
					disabled={props.disabled}
					placeholder={props.placeholder}
					value={props.value}
					maxLength={props.maxLength}
					max={props.maxLength}
				/>
				{props.icon && (
					<div className={'center px-3'}>
						<div className="relative center cursor-pointer">{props.icon}</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default TextInput
