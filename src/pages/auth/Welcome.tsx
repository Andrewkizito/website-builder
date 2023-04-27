// Importing helper modules
import { DarkModeContext } from 'App'
import { Outlet } from 'react-router-dom'
import { useContext } from 'react'

// Importing core components
import banner from 'assets/images/banner.jpg'

const Welcome = () => {
	// DarkMode Context
	const { darkMode } = useContext(DarkModeContext)

	return (
		<div
			className={`h-screen w-screen ${darkMode ? ' bg-gray-800' : 'bg-white'}`}
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-5 h-full">
				<div className="p-10 max-md:p-5 h-full center">
					<Outlet />
				</div>
				<div
					className="h-full bg-cover bg-center max-md:hidden"
					style={{
						backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('${banner}')`,
					}}
				/>
			</div>
		</div>
	)
}

export default Welcome
