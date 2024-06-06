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
  const searchResultsList = document.getElementById('search-results-list')
  searchResultsList.innerHTML = ''
  results.forEach(result => {
    const listItem = document.createElement('button')
    listItem.className = 'sticky-note'
    listItem.innerHTML = `
        <strong>Title:</strong> ${result.title}<br>
        <strong>Date:</strong> ${result.date}<br>
        <p>${result.info}</p>
    `
    searchResultsList.appendChild(listItem)
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
