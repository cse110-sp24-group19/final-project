/**
 * Loads entries for a given date
 *
 * Gets all of the journal entries from local storage,
 * filters them based on a given date, and creates list
 * items for the day view
 *
 * @param {String} date
 */
export function createEntriesForDate (date) {
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

/**
 * Loads entries for a given date
 *
 * Gets all of the journal entries from local storage,
 * filters them based on a given date, and returns the
 * filtered list
 *
 * @param {String} date
 * @returns {Array} filteredEntries
 */
export function loadEntriesForDate (date) {
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || []
  const journalList = document.getElementById('journal-list')
  if (journalList) {
    journalList.innerHTML = '' // Clear existing entries
  }

  const filteredEntries = entries.filter(entry => entry.date === date)

  return filteredEntries
}

// Format date for journal entries
export function formatDateForJournalEntries (dateString) {
  const [year, month, day] = dateString.split('-')
  return `${parseInt(month)}/${parseInt(day)}/${year}`
}

// Function to search journal entries
export function searchEntries (journalEntries, query) {
  return journalEntries.filter(entry =>
    entry.title.toLowerCase().includes(query.toLowerCase()) ||
    entry.content.toLowerCase().includes(query.toLowerCase())
  )
}

export function initializeCalendarScript () {
// Function to display search results in the calendar
  function displaySearchResults (entries) {
    const calendar = document.querySelector('.calendar-dates')
    calendar.innerHTML = '' // Clear existing dates

    entries.sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date

    entries.forEach(entry => {
      const date = new Date(entry.date)
      const listItem = document.createElement('li')
      listItem.className = `sticky-note ${date.getDay() === 0 || date.getDay() === 6 ? 'weekend' : ''}`
      listItem.dataset.date = entry.date
      listItem.innerHTML = `
        <div class="content">
          <div class="date">${date.getDate()}</div>
          <div class="title">${entry.title}</div>
        </div>`
      listItem.addEventListener('click', () => openDayView(entry.date))
      calendar.appendChild(listItem)
    })
  }

  // get current date information
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth()

  // const day = document.querySelector('.calendar-dates')

  const currdate = document.querySelector('.calendar-current-date')

  const prenexIcons = document.querySelectorAll('.calendar-navigation span')

  const calendarView = document.getElementById('calendar-journal-page')

  const dayView = document.getElementById('day-view')

  const returnCalendarButton = document.getElementById('return-calendar')

  const todayButton = document.getElementById('reloadbutton')

  // functions for "Today" Button in calendar that reloads the page and returns to the current month
  // Because the pages are all in the same HTML file, we have to essentially go through the same process
  // that the page goes through when it first loads, it hides all the pages besides the main-page. However,
  // when we use the Today Button it will hide all the pages (including main) and just expose the calendar instead.
  function reloadAndRunFunction () {
    localStorage.setItem('runAfterReload', 'true')
    location.reload()
  }

  // this function hides everything but the calendar page
  function reloadPage () {
    document.addEventListener('DOMContentLoaded', function () {
      const mainPage = document.getElementById('main-page')
      const calendarJournalPage = document.getElementById('calendar-journal-page')
      const creativePlayPage = document.getElementById('creative-play-page')
      const goalSettingPage = document.getElementById('goal-setting-page')
      const rewardPage = document.getElementById('reward-page')

      // Function to show one page and hide others
      function showPage (pageToShow) {
        [mainPage, calendarJournalPage, creativePlayPage, goalSettingPage, rewardPage].forEach(page => {
          if (page === pageToShow) {
            page.classList.remove('hidden')
          } else {
            page.classList.add('hidden')
          }
        })
      }
      showPage(calendarJournalPage)
    })
  }
  todayButton.addEventListener('click', reloadAndRunFunction)
  if (localStorage.getItem('runAfterReload') === 'true') {
    localStorage.removeItem('runAfterReload')
    reloadPage()
  }

  // Array of month names
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  // Function to generate the calendar
  const manipulate = () => {
    // Get the first day of the month
    const dayone = new Date(year, month, 1).getDay()

    // Get the last date of the month
    const lastdate = new Date(year, month + 1, 0).getDate()

    // Get the day of the last date of the month
    const dayend = new Date(year, month, lastdate).getDay()

    // Get the last date of the previous month
    const monthlastdate = new Date(year, month, 0).getDate()

    // Variable to store the generated calendar HTML
    let calendarHtml = ''

    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
      calendarHtml += `<li class="sticky-note inactive">
                  <div class="content"> 
                    <div class="date">${monthlastdate - i + 1}</div>
                    <div class="title"></div>
                    <div class="more-tasks"></div>
                  </div>
              </li>`
    }

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
      const date = new Date(year, month, i)
      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6 ? 'weekend' : ''
      const isToday =
        i === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear()
          ? 'active'
          : ''

      const entries = loadEntriesForDate(date.toLocaleDateString())
      const numEntries = entries.length
      const firstEntryTitle = numEntries > 0 ? entries[0].title : ''

      calendarHtml += `
              <li class="sticky-note ${isWeekend}" data-date="${year}-${String(
        month + 1
      ).padStart(2, '0')}-${String(i).padStart(2, '0')}">
                <div class="content"> 
                  <div class="date ${isToday}">${i}</div>
                  <div class="title">${firstEntryTitle}</div>
                  <div class="more-tasks">${numEntries > 1 ? `+${numEntries - 1} more` : ''}</div>
                </div>
              </li>`
    }

    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
      calendarHtml += `
              <li class="sticky-note inactive">
                <div class="content"> 
                  <div class="date">${i - dayend + 1}</div>
                  <div class="title"></div>
                  <div class="more-tasks"></div>
                </div>
              </li>`
    }

    // Update the text of the current date element
    // with the formatted current month and year
    currdate.innerText = `${months[month]} ${year}`

    // Update the HTML of the calendar element
    // with the generated calendar
    document.querySelector('.calendar-dates').innerHTML = calendarHtml

    // Attach event listeners to each date for opening day view
    document.querySelectorAll('.sticky-note').forEach((item) => {
      item.addEventListener('click', function () {
        console.log(`opening day view for this date : ${this.getAttribute('data-date')}`)
        openDayView(this.getAttribute('data-date'))
      })
    })
  }

  manipulate()

  /**
   * Loads all entries
   *
   * Gets all entries from local storage
   *
   * @returns {Array} entries
   */
  function loadAllEntries () {
    return JSON.parse(localStorage.getItem('journalEntries')) || []
  }

  // Function that opens the day view
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

  // Function to close day view and return to calendar
  function closeDayView () {
    // Update the calendar view after day view changes
    manipulate()

    // Hides day view
    dayView.classList.add('hidden')

    // Shows calendar view
    calendarView.classList.remove('hidden')
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !dayView.classList.contains('hidden')) {
      closeDayView()
    }
  })

  // Attach a click event listener to each icon
  prenexIcons.forEach((icon) => {
    // When an icon is clicked
    icon.addEventListener('click', () => {
      // Check if the icon is "calendar-prev"
      // or "calendar-next"
      month = icon.id === 'calendar-prev' ? month - 1 : month + 1

      // Check if the month is out of range
      if (month < 0 || month > 11) {
        // Set the date to the first day of the
        // month with the new year
        date = new Date(year, month, new Date().getDate())

        // Set the year to the new year
        year = date.getFullYear()

        // Set the month to the new month
        month = date.getMonth()
      } else {
        // Set the date to the current date
        date = new Date()
      }

      // Call the manipulate function to
      // update the calendar display
      manipulate()
    })
  })

  // Back button functionality
  document.querySelector('.back-button').onclick = closeDayView
  // Attach event listener for the return to calendar button in the day view
  returnCalendarButton.addEventListener('click', closeDayView)

  // Function to handle search input dynamically
  document.getElementById('search-bar').addEventListener('submit', (event) => {
    event.preventDefault() // Prevent form submission
    const query = document.querySelector('input[name="query"]').value
    const allEntries = loadAllEntries()
    const results = searchEntries(allEntries, query)
    displaySearchResults(results)
  })
}
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initializeCalendarScript)
}
