import { render, screen, fireEvent } from '@testing-library/react'
import Button from 'components/ui/Button'

test('renders a button with text "Click me"', () => {
	const handler = jest.fn()
	render(<Button title="Click me" color="primary" clicked={handler} />)
	const buttonElement = screen.getByText('Click me')
	fireEvent.click(buttonElement)
	expect(handler).toHaveBeenCalled()
})
