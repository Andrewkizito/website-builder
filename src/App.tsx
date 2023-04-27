// Importing helper modules
import { Auth, Hub } from 'aws-amplify'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { createContext, useEffect, useMemo, useState } from 'react'

// Importing core components
import { ToastContainer } from 'react-toastify'
import routes, { AppRoute } from 'utils/routes'

interface DarkModeContextProps {
	darkMode: boolean
	toggleDarkMode: () => void
}

interface CurrentUserContextProps {
	user: any
	setUser: (val: any) => void
}

export const DarkModeContext = createContext<DarkModeContextProps>({
	darkMode: false,
	toggleDarkMode: () => console.log('init'),
})

export const CurrentUserContext = createContext<CurrentUserContextProps>({
	user: null,
	setUser: () => console.log('init'),
})

type AuthState = 'authenticated' | 'unauthenticated'

function App() {
	// Initialize DarkMode
	const [darkMode, setDarkMode] = useState(
		() =>
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
	)
	// Current User
	const [user, setUser] = useState(null)

	// Authentication Status
	const [authStatus, setAuthStatus] = useState<AuthState>('unauthenticated')

	useEffect(() => {
		Auth.currentAuthenticatedUser()
			.then(() => setAuthStatus('authenticated'))
			.catch(() => setAuthStatus('unauthenticated'))

		Hub.listen('auth', ({ payload: { event, data } }) => {
			switch (event) {
				case 'signIn':
					setAuthStatus('authenticated')
					break
				case 'signOut':
					setAuthStatus('unauthenticated')
					break
				case 'signIn_failure':
					console.error('Sign in failure', data)
					break
				default:
					break
			}
		})
	}, [])

	// DarkMode Toggler
	const toggleDarkMode = () => {
		setDarkMode(!darkMode)
	}

	// DarkMode Toggler
	const updateUser = (val: any) => {
		setUser(val)
	}

	// Filtering app routes depending on auth-status
	const appRoutes = useMemo<AppRoute[]>(
		() =>
			routes.filter(
				(item) => item.authenticated === (authStatus === 'authenticated')
			),
		[authStatus]
	)

	return (
		<DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
			<CurrentUserContext.Provider value={{ user: user, setUser: updateUser }}>
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
				/>
				<BrowserRouter>
					<Routes>
						{appRoutes.map((item, i: number) => {
							if (item.nested)
								return (
									<Route key={i} path={item.path} element={item.component}>
										{item.nested.map((item, i: number) => (
											<Route
												path={item.path}
												key={i}
												element={item.component}
											/>
										))}
									</Route>
								)
							return <Route key={i} path={item.path} element={item.component} />
						})}
						<Route
							path="*"
							element={
								<Navigate
									to={authStatus === 'authenticated' ? '/dashboard' : '/'}
								/>
							}
						/>
					</Routes>
				</BrowserRouter>
			</CurrentUserContext.Provider>
		</DarkModeContext.Provider>
	)
}

export default App
