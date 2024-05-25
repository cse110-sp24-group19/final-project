// dummy data for journal entries
const journalEntries = [

]

// function to retrieve journal entry titles from the array of journal entries
function getTitles (date) {
  const titles = []
  for (const entry of journalEntries) {
    if (entry.date === date) {
      titles.push(entry.title)
    }
  }
  return titles
}

// Function to search journal entries
function searchEntries(query) {
  return journalEntries.filter(entry =>
    entry.title.toLowerCase().includes(query.toLowerCase()) ||
    entry.content.toLowerCase().includes(query.toLowerCase())
  );
}

// Function to display search results in the calendar
function displaySearchResults(entries) {
  const calendar = document.querySelector('.calendar-dates');
  calendar.innerHTML = ''; // Clear existing dates

  entries.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

  entries.forEach(entry => {
    const date = new Date(entry.date);
    const listItem = document.createElement('li');
    listItem.className = `sticky-note ${date.getDay() === 0 || date.getDay() === 6 ? 'weekend' : ''}`;
    listItem.dataset.date = entry.date;
    listItem.innerHTML = `
      <div class="content">
        <div class="date">${date.getDate()}</div>
        <div class="title">${entry.title}</div>
      </div>`;
    listItem.addEventListener('click', () => openDayView(entry.date));
    calendar.appendChild(listItem);
  });
}

// get current date information
let date = new Date()
let year = date.getFullYear()
let month = date.getMonth()

// const day = document.querySelector('.calendar-dates')

const currdate = document.querySelector('.calendar-current-date')

const prenexIcons = document.querySelectorAll('.calendar-navigation span')

const calendarView = document.querySelector('.calendar-container')

const dayView = document.querySelector('#day-view')

const returnCalendarButton = document.getElementById('return-calendar')

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
    calendarHtml += `
            <li class="sticky-note ${isWeekend}" data-date="${year}-${String(
      month + 1
    ).padStart(2, '0')}-${String(i).padStart(2, '0')}">
               <div class="content"> 
                <div class="date ${isToday}">${i}</div>
                <div class="title">Event ${i}</div>
                <div class="more-tasks">+3 more</div>
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

// Function that opens the day view
function openDayView (dateString) {
  // Update day view content based on the clicked date
  const formattedDate = formatDateForJournalEntries(dateString)
  document.querySelector('.day-view-date').textContent = formattedDate

  // Shows journal entries for selected date
  const titles = getTitles(formattedDate)
  const journalList = document.getElementById('journal-list')
  journalList.innerHTML = ''
  titles.forEach((title) => {
    const listItem = document.createElement('li')
    listItem.textContent = title
    journalList.appendChild(listItem)
  })

  // Shows day view
  dayView.style.display = 'block'
  // Hide calendar view
  calendarView.style.display = 'none'
}

// Format date for journal entries
function formatDateForJournalEntries (dateString) {
  const [year, month, day] = dateString.split('-')
  return `${parseInt(month)}/${parseInt(day)}/${year}`
}

// Function to close day view and return to calendar
function closeDayView () {
  // Hides day view
  dayView.style.display = 'none'

  // Shows calendar view
  calendarView.style.display = 'block'
}

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
  event.preventDefault(); // Prevent form submission
  const query = document.querySelector('input[name="query"]').value;
  const results = searchEntries(query);
  displaySearchResults(results);
});
