// Importing helper modules
import React from 'react'
import ReactDOM from 'react-dom/client'

// Importing backend setup
import { Amplify } from 'aws-amplify'
import config from './aws-exports'

// Importing core components
import App from './App'

// Importing styles
import './index.css'
import './assets/icons/icofont.min.css'
import 'animate.css/animate.min.css'
import 'react-activity/dist/library.css'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-notifications-component/dist/theme.css'

// Setup backend
Amplify.configure(config)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
