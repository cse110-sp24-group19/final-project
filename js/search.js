const dayView = document.getElementById('day-view')
const resultView = document.getElementById('search-results-page')
// Add an event listener to the form with ID 'search-bar' that triggers on form submission
document.getElementById('search-button').addEventListener('click', function (event) {
  const searchText = event.target.value.trim().toLowerCase()
  const entries = loadAllEntries()
  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchText) ||
    entry.info.toLowerCase().includes(searchText)
  )
  displaySearchResults(filteredEntries)
})

/* ------------------------------------------------------------------------- */
/* ------------------------Functions---------------------------------------- */
// Get all Entries from Local Storage
function loadAllEntries () {
  return JSON.parse(localStorage.getItem('journalEntries')) || []
}

// Function to display search results
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
         <div class="date ">${result.date}</div>
         <p class="info">${result.info}</p>
         <div class="title">Title: ${result.title}</div>
       </div>
    `
    searchResultsList.appendChild(listItem)
  })

  document.querySelectorAll('.sticky-note').forEach((item) => {
    item.addEventListener('click', function () {
      console.log(`opening day view for this date : ${this.getAttribute('data-date')}`)
      openDayView(this.getAttribute('data-date'))
    })
  })
  showPage('search-results-page')
}

// Function to show a specific page and hide others
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

function openDayView (dateString) {
  // Update day view content based on the clicked date
  const formattedDate = formatDateForJournalEntries(dateString)
  document.querySelector('.day-view-date').textContent = formattedDate

  createEntriesForDate(formattedDate)

  // Shows day view
  dayView.classList.remove('hidden')
  resultView.classList.add("hidden")
  // Hide calendar view
}

function formatDateForJournalEntries (dateString) {
  const [year, month, day] = dateString.split('-')
  return `${parseInt(month)}/${parseInt(day)}/${year}`
}

//reverse date format to 2024-06-20
function reverseFormat (dateString) {
  const [month, day, year] = dateString.split('/')
  return `${parseInt(year)}-${parseInt(month)}-${day}`
}

function createEntriesForDate (date) {
  const journalList = document.getElementById('journal-list')
  journalList.innerHTML = '' // Clear existing entries

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

export function loadEntriesForDate (date) {
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || []
  const journalList = document.getElementById('journal-list')
  journalList.innerHTML = '' // Clear existing entries

  const filteredEntries = entries.filter(entry => entry.date === date)

  return filteredEntries
}
window.addEventListener('DOMContentLoaded', () => {
  // Add your event listeners here
  // Also better practice, declare your function before appending the listener
  const backButton = document.getElementById('goback')
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
  backButton.onclick = showPage('calendar-journal-page')
});