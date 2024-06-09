// __tests__/calendar-script.test.js

import {
    loadEntriesForDate,
    searchEntries,
    formatDateForJournalEntries,
    initializeCalendarScript,
    createEntriesForDate,
  } from '../js/calendar-script';
  
  describe('loadEntriesForDate', () => {
    beforeEach(() => {
      localStorage.clear();
      document.body.innerHTML = '<ul id="journal-list"></ul>';
    });
  
    test('loads entries for a specific date', () => {
      const entries = [
        { date: '2024-06-08', title: 'Event 1' },
        { date: '2024-06-09', title: 'Event 2' },
      ];
      localStorage.setItem('journalEntries', JSON.stringify(entries));
  
      const result = loadEntriesForDate('2024-06-08');
      expect(result).toEqual([{ date: '2024-06-08', title: 'Event 1' }]);
    });
  
    test('returns an empty array if no entries match the date', () => {
      const entries = [
        { date: '2024-06-08', title: 'Event 1' },
        { date: '2024-06-09', title: 'Event 2' },
      ];
      localStorage.setItem('journalEntries', JSON.stringify(entries));
  
      const result = loadEntriesForDate('2024-06-10');
      expect(result).toEqual([]);
    });
  });
  
  describe('searchEntries', () => {
    const entries = [
      { title: 'First entry', content: 'Some content' },
      { title: 'Second entry', content: 'More content' },
    ];
  
    test('filters entries based on query in title', () => {
      const result = searchEntries(entries, 'first');
      expect(result).toEqual([{ title: 'First entry', content: 'Some content' }]);
    });
  
    test('filters entries based on query in content', () => {
      const result = searchEntries(entries, 'more');
      expect(result).toEqual([{ title: 'Second entry', content: 'More content' }]);
    });
  
    test('returns an empty array if no entries match the query', () => {
      const result = searchEntries(entries, 'not found');
      expect(result).toEqual([]);
    });
  });
  
  describe('formatDateForJournalEntries', () => {
    test('formats date string correctly', () => {
      const result = formatDateForJournalEntries('2024-06-08');
      expect(result).toBe('6/8/2024');
    });
  });
  
  describe('initializeCalendarScript functions', () => {
    beforeEach(() => {
      localStorage.clear();
      document.body.innerHTML = `
        <div class="calendar-dates"></div>
        <div id="calendar-journal-page"></div>
        <div id="day-view" class="hidden">
          <span class="day-view-date"></span>
          <ul id="journal-list"></ul>
        </div>
        <button id="reloadbutton"></button>
        <div class="calendar-current-date"></div>
        <button id="return-calendar"></button>
        <button class="back-button"></button> <!-- Add this line -->
        <form id="search-bar">
          <input name="query" />
        </form>
      `;
  
      initializeCalendarScript(); // Initialize script after setting up DOM
    });
  
    test('createEntriesForDate creates entries for a specific date', () => {
      const entries = [
        { date: '2024-06-08', title: 'Event 1', info: 'Info 1', id: '1' },
        { date: '2024-06-08', title: 'Event 2', info: 'Info 2', id: '2' },
      ];
      localStorage.setItem('journalEntries', JSON.stringify(entries));
  
      createEntriesForDate('2024-06-08');
  
      const journalItems = document.querySelectorAll('#journal-list li');
      expect(journalItems.length).toBe(2);
      expect(journalItems[0].textContent).toBe('Event 1');
      expect(journalItems[1].textContent).toBe('Event 2');
    });
  
    test('createEntriesForDate returns an empty list if no entries match the date', () => {
      const entries = [
        { date: '2024-06-07', title: 'Event 1', info: 'Info 1', id: '1' },
        { date: '2024-06-07', title: 'Event 2', info: 'Info 2', id: '2' },
      ];
      localStorage.setItem('journalEntries', JSON.stringify(entries));
  
      createEntriesForDate('2024-06-08');
  
      const journalItems = document.querySelectorAll('#journal-list li');
      expect(journalItems.length).toBe(0);
    });
  });
  
  
  
  