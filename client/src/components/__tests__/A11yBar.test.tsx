import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import A11yBar from '../A11yBar'

describe('A11yBar Component', () => {
  it('renders accessibility bar', () => {
    render(<A11yBar />)
    // A11yBar uses role="region", not contentinfo
    expect(screen.getByRole('region', { name: /accessibility controls/i })).toBeInTheDocument()
  })

  it('has high contrast toggle button', () => {
    render(<A11yBar />)
    const button = screen.getByRole('button', { name: /high contrast/i })
    expect(button).toBeInTheDocument()
  })

  it('has accessibility check button', () => {
    render(<A11yBar />)
    const button = screen.getByRole('button', { name: /a11y check/i })
    expect(button).toBeInTheDocument()
  })

  it('is keyboard accessible', async () => {
    const user = userEvent.setup()
    render(<A11yBar />)
    
    // Tab to first button
    await user.tab()
    const buttons = screen.getAllByRole('button')
    const highContrastButton = buttons.find(btn => btn.textContent?.includes('High Contrast'))
    
    expect(highContrastButton).toHaveFocus()
    
    // Tab to second button
    await user.tab()
    const a11yCheckButton = buttons.find(btn => btn.textContent?.includes('A11y Check'))
    expect(a11yCheckButton).toHaveFocus()
  })

  it('renders all required elements', () => {
    render(<A11yBar />)
    expect(screen.getByText(/accessibility mode/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /high contrast/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /a11y check/i })).toBeInTheDocument()
  })
})
