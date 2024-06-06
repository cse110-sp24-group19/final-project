// Add an event listener to the form with ID 'search-bar' that triggers on form submission
document.getElementById('search-bar').addEventListener('submit', function(event) {
    event.preventDefault(); 
    let searchText = event.target.query.value.trim().toLowerCase();
    let entries = loadAllEntries();
    let filteredEntries = entries.filter(entry => 
        entry.title.toLowerCase().includes(searchText) || 
        entry.info.toLowerCase().includes(searchText)
    );
    displaySearchResults(filteredEntries);
});

/*-------------------------------------------------------------------------*/
/*------------------------Functions----------------------------------------*/
// Get all Entries from Local Storage
function loadAllEntries () {
    return JSON.parse(localStorage.getItem('journalEntries')) || [];
}

// Function to display search results
function displaySearchResults(results) {
  const searchResultsList = document.getElementById('search-results-list');
  searchResultsList.innerHTML = '';
  results.forEach(result => {
    const listItem = document.createElement('button');
    listItem.className = `sticky-note`
    listItem.innerHTML =`
        <strong>Title:</strong> ${result.title}<br>
        <strong>Date:</strong> ${result.date}<br>
        <p>${result.info}</p>
    `;
    listItem.addEventListener('click', () => openDayView(result.date));
    searchResultsList.appendChild(listItem);
  });
  showPage('search-results-page');
}

function openDayView (dateString) {
    // Update day view content based on the clicked date
    const formattedDate = formatDateForJournalEntries(dateString)
    document.querySelector('.day-view-date').textContent = formattedDate
    createEntriesForDate(formattedDate)
    // Shows day view
    dayView.classList.remove('hidden')
    // Hide calendar view
    calendarView.classList.add('hidden')
  }

// Function to show a specific page and hide others
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    if (page.id === pageId) {
      page.classList.remove('hidden');
    } else {
      page.classList.add('hidden');
    }
  });
}

// Function to get the current visible page ID
function getCurrentPageId() {
  const pages = document.querySelectorAll('.page');
  for (const page of pages) {
    if (!page.classList.contains('hidden')) {
      return page.id;
    }
  }
  return null;
}
