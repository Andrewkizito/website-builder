import { Switch } from '@headlessui/react'

interface Props {
	enabled: boolean
	setEnabled: (val: boolean) => void
}

const Toggle: React.FC<Props> = (props) => {
	return (
		<Switch
			checked={props.enabled}
			onChange={props.setEnabled}
			className={`${
				props.enabled ? 'bg-blue-600' : 'bg-gray-400'
			} relative inline-flex h-4 w-9 items-center rounded-full`}
		>
			<span
				className={`${
					props.enabled ? 'translate-x-6' : 'translate-x-1'
				} inline-block h-2 w-2 transform rounded-full bg-white transition duration-300`}
			/>
		</Switch>
	)
}

export default Toggle
