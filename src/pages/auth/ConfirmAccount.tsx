// Importing helper modules
import { Auth } from 'aws-amplify'
import { CurrentUserContext, DarkModeContext } from 'App'
import { toast } from 'react-toastify'
import { useContext, useState } from 'react'

// Importing core components
import { NavLink } from 'react-router-dom'
import { Spinner } from 'react-activity'
import Button from 'components/ui/Button'
import TextInput from 'components/modules/TextInput'

const ConfirmAccount = () => {
	// User Context
	const { user, setUser } = useContext(CurrentUserContext)

	// DarkMode Context
	const { darkMode } = useContext(DarkModeContext)

	// Form state
	const [password, setPassword] = useState<string>('')

	// UI State
	const [loading, setLoading] = useState<boolean>(false)

	// Sign in function
	async function submit() {
		setLoading(true)
		try {
			const res = await Auth.completeNewPassword(user, password)
			setUser(res)
		} catch (error: any) {
			toast.error(error.message)
		}
		setLoading(false)
	}

	return (
		<div className="w-full">
			<h2
				className={`text-3xl font-semibold mb-4 ${
					darkMode ? 'text-gray-50 font-normal' : 'text-gray-900 font-medium'
				}`}
			>
				Confirm Account
			</h2>
			<h3
				className={`text-lg font-semibold ${
					darkMode ? 'text-gray-100 font-normal' : 'text-gray-600 font-medium'
				}`}
			>
				Account confirmation needed
			</h3>
			<p
				className={`max-w-lg text-sm mt-4 mb-8 ${
					darkMode ? 'text-gray-300 font-normal' : 'text-gray-600 font-medium'
				}`}
			>
				Create new password inorder to confirm your account.
			</p>

			<TextInput
				label="New Password"
				placeholder="Your password"
				value={password}
				type="password"
				disabled={loading}
				setValue={(val) => setPassword(val)}
			/>
			<Button
				title="Comfirm Account"
				fullWidth
				color={'success'}
				clicked={submit}
				disabled={loading}
				icon={
					loading ? (
						<Spinner color="#727981" size={8} speed={1} animating={true} />
					) : null
				}
			/>
			<NavLink to={'/'}>
				<h4
					className={`font-semibold text-sm  text-center mt-4 ${
						darkMode ? 'text-gray-200 font-medium' : 'text-gray-700 font-medium'
					}`}
				>
					Back to login?{' '}
					<span className={'text-primary cursor-pointer'}>Click Here</span>
				</h4>
			</NavLink>
		</div>
	)
}

export default ConfirmAccount
