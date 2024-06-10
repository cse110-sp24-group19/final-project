/**
 * @jest-environment jsdom
 */
import {
  hasOverflow,
  saveEntryToLocalStorage,
  isValidId,
  isValidTitle,
  isValidInfo,
  updateEntryInLocalStorage,
  removeEntryFromLocalStorage
} from '../js/day-view'

describe('Day View Utility Functions', () => {

  describe('hasOverflow', () => {

    beforeEach(() => {
      document.body.innerHTML = `
        <div id="day-view" style="height: 100px; overflow: hidden;"></div>
        <button class="back-button" style="position: absolute;"></button>
      `

      // Simulate the overflow by setting properties directly
      const container = document.querySelector('#day-view')
      Object.defineProperty(container, 'scrollHeight', { value: 200, writable: true })
      Object.defineProperty(container, 'clientHeight', { value: 100, writable: true })
    })

    test('should set button position to relative when there is overflow', () => {
      const container = document.querySelector('#day-view')
      const button = document.querySelector('.back-button')

      hasOverflow(container, button)
      expect(button.style.position).toBe('relative')
    })

  })

  describe('Validation Functions', () => {

    test('isValidId should return true for valid ids', () => {
      expect(isValidId('123')).toBe(true)
      expect(isValidId('')).toBe(false)
      expect(isValidId('   ')).toBe(false)
    })

    test('isValidTitle should return true for valid titles', () => {
      expect(isValidTitle('Title')).toBe(true)
      expect(isValidTitle('')).toBe(false)
      expect(isValidTitle('   ')).toBe(false)
    })

    test('isValidInfo should return true for valid info', () => {
      expect(isValidInfo('Info')).toBe(true)
      expect(isValidInfo('')).toBe(false)
      expect(isValidInfo('   ')).toBe(false)
    })

  })

  describe('Local Storage Functions', () => {

    beforeEach(() => {
      localStorage.clear()
    })

    test('saveEntryToLocalStorage should save entry correctly', () => {
      saveEntryToLocalStorage('1', '2023-06-09', 'Title', 'Info')
      const entries = JSON.parse(localStorage.getItem('journalEntries'))
      expect(entries).toHaveLength(1)
      expect(entries[0]).toEqual({ id: '1', date: '2023-06-09', title: 'Title', info: 'Info' })
    })

    test('updateEntryInLocalStorage should update entry correctly', () => {
      localStorage.setItem('journalEntries', JSON.stringify([{ id: '1', date: '2023-06-09', title: 'Title', info: 'Info' }]))
      updateEntryInLocalStorage('1', 'Updated Title', 'Updated Info')
      const entries = JSON.parse(localStorage.getItem('journalEntries'))
      expect(entries[0]).toEqual({ id: '1', date: '2023-06-09', title: 'Updated Title', info: 'Updated Info' })
    })

    test('removeEntryFromLocalStorage should remove entry correctly', () => {
      localStorage.setItem('journalEntries', JSON.stringify([{ id: '1', date: '2023-06-09', title: 'Title', info: 'Info' }]))
      removeEntryFromLocalStorage('1')
      const entries = JSON.parse(localStorage.getItem('journalEntries'))
      expect(entries).toHaveLength(0)
    })

  })

})



