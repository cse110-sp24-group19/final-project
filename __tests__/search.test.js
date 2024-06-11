/**
 * @jest-environment jsdom
 */

import { 
  loadAllEntries, 
  displaySearchResults, 
  showPage, 
  openDayView, 
  formatDateForJournalEntries, 
  reverseFormat, 
  createEntriesForDate, 
  loadEntriesForDate 
} from '../js/search';

describe('search.js', () => {
  document.body.innerHTML = `
    <div id="search-results-list"></div>
    <div class="page" id="day-view"></div>
    <div class="page" id="search-results-page"></div>
    <div class="day-view-date"></div>
    <form id="search">
      <input type="text" id="query">
      <button type="submit">Search</button>
    </form>
    <button id="search-back-button">Back</button>
    <div class="page" id="calendar-journal-page"></div>
    <ul id="journal-list"></ul>
  `;

  test('displaySearchResults displays results correctly', () => {
    const results = [
      { date: '2024-06-08', title: 'Event 1', info: 'Info 1' },
      { date: '2024-06-09', title: 'Event 2', info: 'Info 2' }
    ];

    displaySearchResults(results);
    const listItems = document.querySelectorAll('#search-results-list li');
    expect(listItems).toHaveLength(results.length);
    expect(listItems[0].querySelector('.date').textContent).toBe('2024-06-08');
    expect(listItems[0].querySelector('.title').textContent).toBe('Event 1');
  });

  test('showPage displays the correct page', () => {
    showPage('day-view');
    expect(document.getElementById('day-view').classList.contains('hidden')).toBe(false);
    expect(document.getElementById('search-results-page').classList.contains('hidden')).toBe(true);
  });

  test('openDayView updates day view with correct date and entries', () => {
    const dateString = '2024-06-08';
    openDayView(dateString);
    expect(document.querySelector('.day-view-date').textContent).toBe('6/8/2024');
  });

  test('formatDateForJournalEntries formats date string correctly', () => {
    const formattedDate = formatDateForJournalEntries('2024-06-08');
    expect(formattedDate).toBe('6/8/2024');
  });

  test('reverseFormat reverses date format correctly', () => {
    const reversedDate = reverseFormat('6/8/2024');
    expect(reversedDate).toBe('2024-6-08');
  });

  // Helper function to set mock entries in localStorage
  const setMockEntries = (entries) => {
      localStorage.setItem('journalEntries', JSON.stringify(entries));
  };

  // Helper function to load and verify entries for a specific date
  const loadAndVerifyEntriesForDate = (date, expectedEntries) => {
      setMockEntries(expectedEntries);
      const entries = loadEntriesForDate(date);
      return entries;
  };

  test('createEntriesForDate creates entries for a specific date', () => {
      const mockEntries = [
          { id: '1', date: '6/8/2024', title: 'Event 1', info: 'Info 1' },
          { id: '2', date: '6/8/2024', title: 'Event 2', info: 'Info 2' }
      ];
      setMockEntries(mockEntries);

      createEntriesForDate('6/8/2024');
      const entries = document.querySelectorAll('#journal-list li');
      expect(entries).toHaveLength(2);
      expect(entries[0].textContent).toBe('Event 1');
  });

  test('loadAllEntries loads all entries from local storage', () => {
      const mockEntries = [
          { id: '1', date: '6/8/2024', title: 'Event 1', info: 'Info 1' },
          { id: '2', date: '6/9/2024', title: 'Event 2', info: 'Info 2' }
      ];
      setMockEntries(mockEntries);
      const entries = loadAllEntries();
      expect(entries).toEqual(mockEntries);
  });

  test('loadEntriesForDate loads entries for a specific date', () => {
      const mockEntries = [
          { id: '1', date: '6/8/2024', title: 'Event 1', info: 'Info 1' },
          { id: '2', date: '6/9/2024', title: 'Event 2', info: 'Info 2' }
      ];
      const entries = loadAndVerifyEntriesForDate('6/8/2024', mockEntries);
      expect(entries).toEqual([{ id: '1', date: '6/8/2024', title: 'Event 1', info: 'Info 1' }]);
  });
});


  