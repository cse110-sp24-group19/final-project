/**
 * @jest-environment jsdom
 */

import {
  loadEntriesForDate,
  searchEntries,
  formatDateForJournalEntries,
  initializeCalendarScript,
} from '../js/calendar-script';

// Common setup for journal entries in localStorage
const setJournalEntries = (entries) => {
  localStorage.setItem('journalEntries', JSON.stringify(entries));
};

// Tests for the loadEntriesForDate function
describe('loadEntriesForDate', () => {
  // Clear localStorage and set up the DOM before each test
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '<ul id="journal-list"></ul>';
  });

  // Test returning an empty array if no entries match the date
  test('returns an empty array if no entries match the date', () => {
    const entries = [
      { date: '2024-06-08', title: 'Event 1' },
      { date: '2024-06-09', title: 'Event 2' },
    ];
    setJournalEntries(entries);

    const result = loadEntriesForDate('2024-06-10');
    expect(result).toEqual([]);
  });
});

// Tests for the searchEntries function
describe('searchEntries', () => {
  const entries = [
    { title: 'First entry', content: 'Some content' },
    { title: 'Second entry', content: 'More content' },
  ];

  // Test filtering entries based on query in title
  test('filters entries based on query in title', () => {
    const result = searchEntries(entries, 'first');
    expect(result).toEqual([{ title: 'First entry', content: 'Some content' }]);
  });

  // Test filtering entries based on query in content
  test('filters entries based on query in content', () => {
    const result = searchEntries(entries, 'more');
    expect(result).toEqual([{ title: 'Second entry', content: 'More content' }]);
  });

  // Test returning an empty array if no entries match the query
  test('returns an empty array if no entries match the query', () => {
    const result = searchEntries(entries, 'not found');
    expect(result).toEqual([]);
  });
});

// Tests for the formatDateForJournalEntries function
describe('formatDateForJournalEntries', () => {
  // Test formatting date string correctly
  test('formats date string correctly', () => {
    const result = formatDateForJournalEntries('2024-06-08');
    expect(result).toBe('6/8/2024');
  });
});

// Tests for the initializeCalendarScript functions
describe('initializeCalendarScript functions', () => {
  // Clear localStorage and set up the DOM before each test
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
      <button class="back-button"></button>
      <form id="search-bar">
        <input name="query" />
      </form>
    `;

    initializeCalendarScript(); // Initialize script after setting up DOM
  });

  // Test search bar form submission and displaying results
  test('search bar form submission triggers search and displays results', () => {
    const entries = [
      { date: '2024-06-08', title: 'Event 1', content: 'Info 1' },
      { date: '2024-06-09', title: 'Event 2', content: 'Info 2' },
    ];
    setJournalEntries(entries);
    document.querySelector('input[name="query"]').value = 'Event 1';

    const form = document.getElementById('search-bar');
    form.dispatchEvent(new Event('submit'));

    const calendarDates = document.querySelectorAll('.calendar-dates li');
    expect(calendarDates.length).toBe(1);
    expect(calendarDates[0].querySelector('.title').textContent).toBe('Event 1');
  });
});
