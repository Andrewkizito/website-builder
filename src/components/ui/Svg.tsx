// Importing helper modules
import React, { ReactElement } from 'react'

const Svg: React.FC<{ path: ReactElement; size?: string }> = (props) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={`duration-300 ${props.size ? props.size : 'w-7 h-7'}`}
		>
			{props.path}
		</svg>
	)
}

export default Svg
