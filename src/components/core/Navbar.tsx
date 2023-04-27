// Importing helper modules
import { DarkModeContext } from 'App'
import React, { useContext, useState } from 'react'

// Importing core components
import Svg from 'components/ui/Svg'
import SignOutModal from './SignOutModal'

interface Props {
	sidebarOpen: boolean
	handlerMenu: (val: boolean) => void
}

const Navbar: React.FC<Props> = (props) => {
	// DarkMode Context
	const { darkMode } = useContext(DarkModeContext)

	const [openSignOut, setOpen] = useState<boolean>(false)

	return (
		<div
			className={`h-14 duration-300 fixed right-0 px-4 ${
				props.sidebarOpen ? 'w-[calc(100vw_-_256px)]' : 'w-full'
			} center-between ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
		>
			<div
				onClick={props.handlerMenu.bind(this, !props.sidebarOpen)}
				className={`center cursor-pointer hover:text-primary ${
					darkMode ? 'text-gray-300' : 'text-gray-600'
				}`}
			>
				<Svg
					path={
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					}
				/>
			</div>
			<div className="flex items-center gap-6">
				<div
					onClick={setOpen.bind(this, true)}
					className={`center cursor-pointer hover:text-primary h-12 ${
						darkMode ? 'text-gray-300' : 'text-gray-600'
					}`}
				>
					<Svg
						path={
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
							/>
						}
					/>
				</div>
			</div>
			<SignOutModal
				darkMode={darkMode}
				open={openSignOut}
				setOpen={(val) => setOpen(val)}
			/>
		</div>
	)
}

export default Navbar
