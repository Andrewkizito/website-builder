// Importing helper modules
import React, { ReactElement, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { DarkModeContext } from 'App'

// Importing core components
import routes from 'utils/routes'
import Switch from 'components/ui/Switch'

const Heading: React.FC<{ darkMode: boolean; title: string }> = (props) => (
	<h2
		className={`pl-2 duration-300 text-sm font-medium ${
			props.darkMode ? 'text-gray-300' : 'text-gray-900'
		}`}
	>
		{props.title}
	</h2>
)

const ListItem: React.FC<{
	children: ReactElement
	className?: string
	darkMode?: boolean
	active?: boolean
}> = (props) => (
	<li
		className={`py-3 px-3 flex items-center gap-2 duration-300 rounded-md ${
			props.className
		} ${props.active && `${props.darkMode ? 'bg-gray-700' : 'bg-slate-200'}`}`}
	>
		{props.children}
	</li>
)

const Sidebar: React.FC<{ open: boolean }> = (props) => {
	// Get pathname
	const { pathname } = useLocation()

	// DarkMode context
	const { darkMode, toggleDarkMode } = useContext(DarkModeContext)

	return (
		<div
			className={`h-full shadow-sm fixed left-0 top-0 w-64 py-14 px-3 duration-300 ${
				props.open ? 'translate-x-0' : '-translate-x-[100%]'
			} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
		>
			<Heading title={'General'} darkMode={darkMode} />
			<ul className="mt-2 mb-4">
				{routes
					.filter((item) => item.authenticated && item.type === 'general')
					.map((item) => (
						<NavLink to={item.path} key={item.title}>
							<ListItem
								active={item.path === pathname}
								darkMode={darkMode}
								className={`justify-start ${
									darkMode ? 'hover:bg-gray-700' : 'hover:bg-slate-200'
								}`}
							>
								<>
									<i
										className={`text-xl duration-300 ${item.icon} ${
											darkMode ? 'text-gray-300' : 'text-gray-600'
										}`}
									></i>
									<p
										className={`text-sm duration-300 ${
											darkMode
												? 'text-gray-100 font-extralight'
												: 'text-gray-600 font-normal'
										}`}
									>
										{item.title}
									</p>
								</>
							</ListItem>
						</NavLink>
					))}
			</ul>
			<Heading title={'Content Management'} darkMode={darkMode} />
			<ul className="mt-2 mb-4">
				{routes
					.filter((item) => item.authenticated && item.type === 'management')
					.map((item) => (
						<NavLink to={item.path} key={item.title}>
							<ListItem
								active={pathname.startsWith(item.path)}
								darkMode={darkMode}
								className={`justify-start ${
									darkMode ? 'hover:bg-gray-700' : 'hover:bg-slate-200'
								}`}
							>
								<>
									<i
										className={`text-xl duration-300 ${item.icon} ${
											darkMode ? 'text-gray-300' : 'text-gray-600'
										}`}
									></i>
									<p
										className={`text-sm duration-300 ${
											darkMode
												? 'text-gray-100 font-extralight'
												: 'text-gray-600 font-normal'
										}`}
									>
										{item.title}
									</p>
								</>
							</ListItem>
						</NavLink>
					))}
			</ul>
			<Heading title={'Settings'} darkMode={darkMode} />
			<ul className="mt-2 mb-4">
				<ListItem className=" justify-between">
					<>
						<div className="center gap-2">
							<i
								className={`text-xl duration-300  ${
									darkMode
										? 'text-gray-300 icofont-moon'
										: 'text-gray-600 icofont-sun-alt'
								}`}
							></i>
							<p
								className={`text-sm duration-300 ${
									darkMode
										? 'text-gray-100 font-extralight'
										: 'text-gray-600 font-normal'
								}`}
							>
								{darkMode ? 'Dark Mode' : 'Light Mode'}
							</p>{' '}
						</div>
						<Switch enabled={darkMode} setEnabled={toggleDarkMode} />
					</>
				</ListItem>
			</ul>
		</div>
	)
}

export default Sidebar
