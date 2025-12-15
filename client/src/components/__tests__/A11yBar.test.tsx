import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import A11yBar from '../A11yBar'

describe('A11yBar Component', () => {
  it('renders accessibility bar', () => {
    render(<A11yBar />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('has high contrast toggle button', () => {
    render(<A11yBar />)
    const button = screen.getByRole('button', { name: /high contrast/i })
    expect(button).toBeInTheDocument()
  })

  it('toggles high contrast mode when button clicked', async () => {
    const user = userEvent.setup()
    render(<A11yBar />)
    
    const button = screen.getByRole('button', { name: /high contrast/i })
    await user.click(button)
    
    // Verify high contrast class is applied
    expect(document.body.classList.contains('high-contrast')).toBe(true)
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
    expect(screen.getByRole('button', { name: /high contrast/i })).toHaveFocus()
    
    // Tab to second button
    await user.tab()
    expect(screen.getByRole('button', { name: /a11y check/i })).toHaveFocus()
  })
})
