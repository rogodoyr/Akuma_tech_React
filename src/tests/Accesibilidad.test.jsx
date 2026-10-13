// =============================================
// Pruebas de ACCESIBILIDAD con jest-axe
// Detectan problemas de accesibilidad en el HTML
// =============================================
// expect.extend({ toHaveNoViolations }) agrega el matcher

import { render } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import App from '../App'
import Footer from '../components/Footer'

expect.extend(toHaveNoViolations)

describe('Accesibilidad', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('App has no accessibility violations', async () => {
    const { container } = render(<App />)

    const results = await axe(container)

    // Si hay violaciones, el test falla y muestra cuáles son
    expect(results).toHaveNoViolations()
  }, 15000)

  it('Footer has no accessibility violations', async () => {
    const { container } = render(<Footer navegar={() => {}} />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  }, 15000)
})
