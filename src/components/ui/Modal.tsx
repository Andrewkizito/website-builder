// Importing helper modules
import { Fragment, ReactElement } from 'react'

// Importing core components
import { Dialog, Transition } from '@headlessui/react'

interface Props {
	title: string
	open: boolean
	darkMode: boolean
	content: ReactElement
	disabled: boolean
	setOpen: (val: boolean) => void
}

const Modal: React.FC<Props> = (props) => {
	return (
		<Transition appear show={props.open} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={props.setOpen.bind(this, props.disabled)}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-950 bg-opacity-90" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel
								className={`w-full max-w-md transform overflow-hidden rounded-md p-6 text-left align-middle shadow-xl transition-all ${
									props.darkMode ? 'bg-slate-800' : 'bg-white'
								}`}
							>
								<Dialog.Title
									as="h3"
									className={`text-lg font-medium leading-6 ${
										props.darkMode ? 'text-gray-300' : 'text-gray-900'
									}`}
								>
									{props.title}
								</Dialog.Title>
								{props.content}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default Modal
