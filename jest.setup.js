// Jest setup file

// Mock CustomEvent for Node environment
import jest from 'jest-mock'

global.CustomEvent = class CustomEvent extends Event {
  constructor (event, params) {
    super(event, params)
    this.detail = params?.detail || null
  }
}
// Mock localStorage for Node environment
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}

// Ensure the Jest environment is loaded before using jest.fn()
beforeAll(() => {
  if (typeof document === 'undefined') {
    global.document = {
      dispatchEvent: jest.fn()
      // Add other document methods if needed
    }
  }
})
