import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'


// Simulacion de localStorage durante las pruebas
const storage = new Map()

const localStorageMock = {
  getItem(key) {
    return storage.has(String(key))
      ? storage.get(String(key))
      : null
  },

  setItem(key, value) {
    storage.set(String(key), String(value))
  },

  removeItem(key) {
    storage.delete(String(key))
  },

  clear() {
    storage.clear()
  },

  key(index) {
    return Array.from(storage.keys())[index] ?? null
  },

  get length() {
    return storage.size
  },
}

// Hacer que las pruebas puedan acceder a localStorage
Object.defineProperty(globalThis, 'localStorage', {
  configurable: true,
  value: localStorageMock,
})

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: localStorageMock,
  })

  window.scrollTo = vi.fn()
}