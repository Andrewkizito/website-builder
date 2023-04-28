// Importing helper modules
import { ReactElement } from 'react'

// Importing pages
import Layout from 'components/core/Layout'
import Welcome from 'pages/auth/Welcome'

// Auth screens
import Login from 'pages/auth/Login'
import Dashboard from 'pages/app/Dashboard/Dashboard'
import ResetPassword from 'pages/auth/ResetPassword'
import ConfirmAccount from 'pages/auth/ConfirmAccount'

export interface AppRoute {
	title: string
	path: string
	icon?: string
	component: ReactElement
	authenticated?: boolean
	type?: 'management' | 'general'
	nested?: {
		component: ReactElement
		path: string
	}[]
}

const routes: AppRoute[] = [
	{
		title: 'Welcome',
		path: '/',
		component: <Welcome />,
		authenticated: false,
		nested: [
			{
				component: <Login />,
				path: '',
			},
			{
				component: <ResetPassword />,
				path: 'register',
			},
			{
				component: <ResetPassword />,
				path: 'forgot-password',
			},
			{
				component: <ConfirmAccount />,
				path: 'confirm-account',
			},
		],
	},
	{
		title: 'Dashboard',
		path: '/dashboard',
		component: (
			<Layout>
				<Dashboard />
			</Layout>
		),
		authenticated: true,
		type: 'general',
		icon: 'icofont-dashboard-web',
	},
	{
		title: 'My Organisations',
		path: '/organisations',
		component: (
			<Layout>
				<Dashboard />
			</Layout>
		),
		authenticated: true,
		type: 'management',
		icon: 'icofont-briefcase',
	},
	{
		title: 'Savings',
		path: '/savings',
		component: (
			<Layout>
				<Dashboard />
			</Layout>
		),
		authenticated: true,
		type: 'management',
		icon: 'icofont-bank-alt',
	},
	{
		title: 'Loans',
		path: '/loans',
		component: (
			<Layout>
				<Dashboard />
			</Layout>
		),
		authenticated: true,
		type: 'management',
		icon: 'icofont-money-bag',
	},
]

export default routes
