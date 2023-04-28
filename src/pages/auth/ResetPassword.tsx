// Importing helper modules
import { Auth } from 'aws-amplify'
import { DarkModeContext } from 'App'
import { toast } from 'react-toastify'
import { useContext, useState } from 'react'

// Importing core components
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-activity'
import Button from 'components/ui/Button'
import Fade from 'react-reveal/Fade'
import TextInput from 'components/modules/TextInput'

const ResetPassword = () => {
	// Navigation
	const navigate = useNavigate()

	// DarkMode Context
	const { darkMode } = useContext(DarkModeContext)

	// Form state
	const [username, setName] = useState<string>('')
	const [code, setCode] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [codeSent, setCodeStatus] = useState<boolean>(false)

	// UI State
	const [loading, setLoading] = useState<boolean>(false)

	// Sign in function
	async function submit() {
		if (!username) return
		setLoading(true)
		try {
			!codeSent
				? await Auth.forgotPassword(username)
				: await Auth.forgotPasswordSubmit(username, code, password)
			if (!codeSent) {
				toast.success('Reset code sent to email')
				setCodeStatus(true)
			} else {
				toast.success('New password setup successfully')
				navigate('/')
			}
		} catch (error: any) {
			toast.error(error.message)
		}

		setLoading(false)
	}

	return (
		<Fade>
			<div className="w-full pr-5">
				<h2
					className={`text-3xl font-semibold mb-4 ${
						darkMode ? 'text-gray-50 font-normal' : 'text-gray-900 font-medium'
					}`}
				>
					Forgot Passsword
				</h2>
				<h3
					className={`text-lg font-semibold ${
						darkMode ? 'text-gray-100 font-normal' : 'text-gray-600 font-medium'
					}`}
				>
					Get reset code.
				</h3>
				<p
					className={`max-w-lg text-sm mt-4 mb-8 ${
						darkMode ? 'text-gray-300 font-normal' : 'text-gray-600 font-medium'
					}`}
				>
					{!codeSent
						? 'Enter your username and your reset code will be send to your email.'
						: 'Enter the reset code from your email and setup a new password for your account.'}
				</p>
				<TextInput
					label="Username"
					placeholder="Your username"
					value={username}
					type="text"
					disabled={loading || codeSent}
					setValue={(val) => setName(val)}
				/>
				{codeSent && (
					<>
						<TextInput
							label="New Password"
							placeholder="Set new password"
							value={password}
							type="password"
							disabled={loading}
							setValue={(val) => setPassword(val)}
						/>
						<TextInput
							label="Code"
							placeholder="Reset Code"
							value={code}
							type="text"
							disabled={loading}
							setValue={(val) => setCode(val)}
						/>
					</>
				)}
				<Button
					title={codeSent ? 'Confirm New Password' : 'Get Code'}
					fullWidth
					color={'primary'}
					clicked={submit}
					disabled={loading}
					icon={
						loading ? (
							<Spinner color="#727981" size={8} speed={1} animating={true} />
						) : null
					}
				/>
				<h4
					className={`font-semibold text-sm  text-center mt-4 ${
						darkMode ? 'text-gray-200 font-medium' : 'text-gray-700 font-medium'
					}`}
					onClick={() => (codeSent ? setCodeStatus(false) : navigate('/'))}
				>
					{codeSent ? "Didn't get code?" : 'Back to login'}{' '}
					<span className={'text-primary cursor-pointer'}>Click Here</span>
				</h4>
			</div>
		</Fade>
	)
}

export default ResetPassword
