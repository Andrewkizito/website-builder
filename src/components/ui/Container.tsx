// Importing helper modules
import { ReactElement } from 'react'

interface Props {
	children: ReactElement
}

const Container: React.FC<Props> = ({ children }) => {
	return <div className="max-w-7xl w-full">{children}</div>
}

export default Container
