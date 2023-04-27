import React, { ReactElement } from 'react'

interface Props {
	count: number
	icon: ReactElement
}

const Badge: React.FC<Props> = (props) => {
	return (
		<div className="relative h-12 w-12 center">
			{props.icon}
			<div className="absolute h-5 w-5 bg-primary right-1 top-1 center rounded-full">
				<p className="text-[12px] text-white">{props.count}</p>
			</div>
		</div>
	)
}

export default Badge
