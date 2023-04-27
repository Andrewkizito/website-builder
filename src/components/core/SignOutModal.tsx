// Importing helper modules
import { Auth } from 'aws-amplify'
import { useState } from 'react'

// Importing core components
import { Spinner } from 'react-activity'
import Button from 'components/ui/Button'
import Modal from 'components/ui/Modal'

interface Props {
	open: boolean
	darkMode: boolean
	setOpen: (val: boolean) => void
}

const SignOutModal: React.FC<Props> = (props) => {
	// Ui state
	const [loading, setLoading] = useState<boolean>(false)

	// Signout function
	async function submit() {
		setLoading(true)
		Auth.signOut()
			.catch((err) => console.log(err))
			.finally(() => setLoading(false))
	}

	return (
		<Modal
			open={props.open}
			setOpen={props.setOpen}
			title="Are you sure?"
			darkMode={props.darkMode}
			disabled={loading}
			content={
				<>
					{loading ? (
						<div className="center py-5 flex-col gap-3">
							<Spinner color="#727981" size={8} speed={1} animating={true} />
							<p
								className={`text-sm ${
									props.darkMode ? 'text-gray-300' : 'text-gray-500'
								}`}
							>
								Please Wait...
							</p>
						</div>
					) : (
						<>
							<div className="mt-2">
								<p
									className={`text-sm ${
										props.darkMode ? 'text-gray-300' : 'text-gray-500'
									}`}
								>
									You will be logged out and you will need to log in again.
								</p>
							</div>
							<div className="mt-4">
								<Button title="Continue" color="success" clicked={submit} />
							</div>
						</>
					)}
				</>
			}
		/>
	)
}

export default SignOutModal
