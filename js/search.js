window.addEventListener('DOMContentLoaded', function () {
  const backButton = document.getElementById('search-back-button')

  // Add an event listener to the form with ID 'search-bar' that triggers on form submission
  document.getElementById('search').addEventListener('submit', function (event) {
    event.preventDefault()
    const searchText = document.getElementById('query').value.trim().toLowerCase()
    const entries = loadAllEntries()
    const filteredEntries = entries.filter(entry =>
      entry.title.toLowerCase().includes(searchText) ||
      entry.info.toLowerCase().includes(searchText)
    )
    displaySearchResults(filteredEntries)
  })

  backButton.addEventListener('click', function () {
    showPage('calendar-journal-page')
  })
})

/* ------------------------------------------------------------------------- */
/* ------------------------Functions---------------------------------------- */

/**
 * Gets all entries from local storage
 *
 * @returns {Array} - The array of all journal entries
 */
function loadAllEntries () {
  return JSON.parse(localStorage.getItem('journalEntries')) || []
}

/**
 * Displays search results in the search results list
 *
 * @param {Array} results - The array of filtered journal entries
 */
function displaySearchResults (results) {
  results.sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
  const searchResultsList = document.getElementById('search-results-list')
  searchResultsList.innerHTML = ''

  results.forEach(result => {
    const listItem = document.createElement('li')
    listItem.className = 'sticky-note result'
    listItem.setAttribute('data-date', reverseFormat(result.date))
    listItem.innerHTML = `
      <div class="content">
        <div class="date">${result.date}</div>
        <div class="title">${result.title.trim()}</div>
      </div>
    `
    listItem.addEventListener('click', function () {
      console.log(`opening day view for this date : ${this.getAttribute('data-date')}`)
      openDayView(this.getAttribute('data-date'))
    })

    searchResultsList.appendChild(listItem)
  })

  showPage('search-results-page')
}

/**
 * Shows a specific page and hides others
 *
 * @param {String} pageId - The ID of the page to show
 */
function showPage (pageId) {
  const pages = document.querySelectorAll('.page')
  pages.forEach(page => {
    if (page.id === pageId) {
      page.classList.remove('hidden')
    } else {
      page.classList.add('hidden')
    }
  })
}

/**
 * Opens the day view for a specific date
 *
 * @param {String} dateString - The date string to open in the day view
 */
function openDayView (dateString) {
  const formattedDate = formatDateForJournalEntries(dateString)
  document.querySelector('.day-view-date').textContent = formattedDate

  createEntriesForDate(formattedDate)

  const dayView = document.getElementById('day-view')
  const resultView = document.getElementById('search-results-page')
  dayView.classList.remove('hidden')
  resultView.classList.add('hidden')
}

/**
 * Formats date string for journal entries
 *
 * @param {String} dateString - The date string to format
 * @returns {String} - The formatted date string
 */
function formatDateForJournalEntries (dateString) {
  const [year, month, day] = dateString.split('-')
  return `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`
}

/**
 * Reverses date format to 'yyyy-mm-dd'
 *
 * @param {String} dateString - The date string to reverse
 * @returns {String} - The reversed date string
 */
function reverseFormat (dateString) {
  const [month, day, year] = dateString.split('/')
  return `${parseInt(year, 10)}-${parseInt(month, 10)}-${parseInt(day, 10).toString().padStart(2, '0')}`
}

/**
 * Creates entries for a specific date
 *
 * @param {String} date - The date to create entries for
 */
function createEntriesForDate (date) {
  const journalList = document.getElementById('journal-list')
  journalList.innerHTML = ''

  const filteredEntries = loadEntriesForDate(date)

  filteredEntries.forEach(entry => {
    const newEntry = document.createElement('li')
    newEntry.textContent = entry.title
    newEntry.dataset.info = entry.info
    newEntry.dataset.id = entry.id
    newEntry.dataset.date = entry.date
    journalList.appendChild(newEntry)
  })
}

/**
 * Loads entries for a specific date from local storage
 *
 * @param {String} date - The date to filter entries by
 * @returns {Array} - The filtered entries
 */
function loadEntriesForDate (date) {
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || []
  const journalList = document.getElementById('journal-list')
  journalList.innerHTML = '' // Clear existing entries

  const filteredEntries = entries.filter(entry => entry.date === date)

  return filteredEntries
}

// Export functions for testing
export { loadAllEntries, displaySearchResults, showPage, openDayView, formatDateForJournalEntries, reverseFormat, createEntriesForDate, loadEntriesForDate }
