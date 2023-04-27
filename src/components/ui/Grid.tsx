interface Props {
	children: any
	cols: 4 | 3 | 2
}

const Grid: React.FC<Props> = (props) => {
	return (
		<div
			className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${props.cols} gap-4`}
		>
			{props.children}
		</div>
	)
}

export default Grid
