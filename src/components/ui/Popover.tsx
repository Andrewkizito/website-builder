// Importing helper modules
import { DarkModeContext } from 'App'
import { Fragment, ReactElement, useContext } from 'react'

// Importing core components
import { Popover, Transition } from '@headlessui/react'

interface Props {
	title: ReactElement
	content: ReactElement
}

const CustomPopover: React.FC<Props> = (props) => {
	const { darkMode } = useContext(DarkModeContext)

	return (
		<Popover className="relative">
			<Popover.Button className={'focus:outline-none'}>
				{props.title}
			</Popover.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
			>
				<Popover.Panel
					className={
						'absolute right-0 z-[100] mt-3 w-screen max-w-sm transform rounded-md border'
					}
				>
					<div
						className={`overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${
							darkMode
								? 'bg-gray-800 border-slate-700'
								: 'bg-white border-gray-300'
						}`}
					>
						<div className="relative">{props.content}</div>
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	)
}

export default CustomPopover
