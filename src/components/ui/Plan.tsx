// Importing core components
import { RadioGroup } from '@headlessui/react'
import CheckIcon from './CheckIcon'
import { type GroupType } from 'utils/contextTypes'

interface Props {
	plan: GroupType
	darkMode: boolean
}

const Plan: React.FC<Props> = (props) => {
	return (
		<RadioGroup.Option
			key={props.plan.name}
			value={props.plan.value}
			className={({ active, checked }) =>
				`duration-300 rounded-sm ${
					active
						? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
						: ''
				}
        ${
					checked
						? 'bg-sky-900 bg-opacity-75'
						: `${
								props.darkMode
									? 'bg-gray-800 bg-opacity-50 text-white'
									: 'bg-white'
						  }`
				}
        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
			}
		>
			{({ active, checked }) => (
				<>
					<div className="flex w-full items-center justify-between">
						<div className="flex items-center">
							<div className="text-sm">
								<RadioGroup.Label
									as="p"
									className={`font-medium text-[16px]  ${
										checked
											? 'text-white font-light'
											: `${
													props.darkMode
														? 'text-gray-300 font-normal'
														: 'text-gray-900'
											  }`
									}`}
								>
									{props.plan.name}
								</RadioGroup.Label>
								<RadioGroup.Description
									as="p"
									className={`max-w-2xl mt-2 ${
										checked
											? 'text-sky-100 font-normal'
											: `${
													props.darkMode
														? 'text-gray-300 font-light'
														: 'text-gray-900 font-normal'
											  }`
									}`}
								>
									{props.plan.description}
								</RadioGroup.Description>
							</div>
						</div>
						{checked && (
							<div className="shrink-0 text-white">
								<CheckIcon className="h-6 w-6" />
							</div>
						)}
					</div>
				</>
			)}
		</RadioGroup.Option>
	)
}

export default Plan
