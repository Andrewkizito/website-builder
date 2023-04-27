// Importing helper modules
import { ReactElement, useContext, useState } from 'react'
import { DarkModeContext } from 'App'

// Importing core components
import { ReactNotifications } from 'react-notifications-component'
import { Tooltip } from 'react-tooltip'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout: React.FC<{ children: ReactElement }> = ({ children }) => {
	// DarkMode Context
	const { darkMode } = useContext(DarkModeContext)

	// Sidebar state
	const [open, setOpen] = useState<boolean>(true)

	return (
		<div
			className={`relative h-screen w-screen duration-300  ${
				darkMode ? 'bg-gray-900' : 'bg-gray-100'
			}`}
		>
			<Tooltip id="my-tooltip" />
			<ReactNotifications />
			<Sidebar open={open} />
			<Navbar sidebarOpen={open} handlerMenu={(value) => setOpen(value)} />
			<div
				className={`absolute ${
					open ? 'w-[calc(100vw_-_256px)]' : 'w-full'
				} duration-300 h-[calc(100vh_-_56px)] bottom-0 right-0 overflow-x-hidden`}
			>
				<div className="relative h-full w-full py-5 px-7 max-w-7xl m-auto">
					{children}
				</div>
			</div>
		</div>
	)
}

export default Layout
