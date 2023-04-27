// Importing core components
import Fade from 'react-reveal/Fade'

const Loader = () => {
	return (
		<div className="center">
			<Fade>
				<div className="lds-spinner">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</Fade>
		</div>
	)
}

export default Loader
