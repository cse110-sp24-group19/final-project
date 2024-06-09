/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals'
import { createStar } from '../js/script'

describe('script.js', () => {
  beforeAll(() => {
    jest.useFakeTimers() // Use fake timers for setTimeout
  })

  beforeEach(() => {
    document.body.innerHTML = '' // Clear the body before each test
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.useRealTimers() // Revert to real timers after tests
  })

  test('creates a star element at the specified position', () => {
    const x = 100
    const y = 200

    createStar(x, y)

    const starElement = document.querySelector('.star')
    expect(starElement).not.toBeNull()
    expect(starElement.style.left).toBe(`${x}px`)
    expect(starElement.style.top).toBe(`${y}px`)
  })

  test('removes the star element after 1000ms', () => {
    const x = 100
    const y = 200

    createStar(x, y)

    let starElement = document.querySelector('.star')
    expect(starElement).not.toBeNull()

    jest.runAllTimers() // Fast forward timers

    starElement = document.querySelector('.star')
    expect(starElement).toBeNull()
  })
})
