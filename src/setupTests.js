import '@testing-library/jest-dom/vitest'

// jsdom no implementa window.scrollTo — lo mockeamos para tests
window.scrollTo = vi.fn()
