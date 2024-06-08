const dayViewContainer = document.querySelector('#day-view')
const dayNewEntryView = document.getElementById('new-entry-page')
const backButton = document.querySelector('.back-button')
const entryDetailsView = document.getElementById('entry-details-page')

// automatically checks if there is overflow
function hasOverflow (returnButton) {
  // const dayViewContainer = document.querySelector('#day-view')
  // Check if there is overflow in the day-view container

  const hasOverflow = dayViewContainer.scrollHeight > dayViewContainer.clientHeight

  // Set the position of the back button based on overflow
  // const backButton = document.querySelector('.back-button')
  if (hasOverflow) {
    returnButton.style.position = 'relative'
  } else {
    returnButton.style.position = 'absolute'
  }
}

hasOverflow(backButton)

function addNewEntry () {
  dayViewContainer.classList.add('hidden')
  dayNewEntryView.classList.toggle('hidden')
}

function closeNewEntry () {
  dayNewEntryView.classList.add('hidden')
  dayViewContainer.classList.remove('hidden')
}

function unhide () {
  document.getElementById('details-title').classList.remove('hidden')
  document.getElementById('details-info').classList.remove('hidden')
  document.getElementById('edit-entry-button').classList.remove('hidden')
  document.getElementById('delete-entry-button').classList.remove('hidden')
}

document.querySelectorAll('.add-button').forEach(button => {
  button.addEventListener('click', addNewEntry)
})

document.querySelectorAll('.back-entry-button').forEach(button => {
  button.addEventListener('click', closeNewEntry)
})

document.querySelector('.save-button').addEventListener('click', function () {
  const title = document.getElementById('entry-title').value
  const info = document.getElementById('entry-info').value

  if (title.trim() === '') {
    alert('Title cannot be empty. Please enter a title.')
    return // Stop execution if title is empty
  }

  // Add new entry to day view
  const newEntry = document.createElement('li')
  const id = Date.now().toString()
  const selectedDate = document.querySelector('.day-view-date').textContent
  newEntry.dataset.id = id
  newEntry.dataset.date = selectedDate
  newEntry.textContent = title
  newEntry.dataset.info = info // Store the info in a data attribute
  newEntry.addEventListener('click', function () {
    openEntryDetails(newEntry) // Pass the entry element
  })
  document.getElementById('journal-list').appendChild(newEntry)

  // save entry to local storage
  saveEntryToLocalStorage(id, selectedDate, title, info)

  // Reset input fields
  document.getElementById('entry-title').value = ''
  document.getElementById('entry-info').value = ''

  // Hide new-entry-page and show day-view
  dayNewEntryView.classList.add('hidden')
  dayViewContainer.classList.remove('hidden')
  hasOverflow(backButton)
})

let currentEntryElement = null // To store the reference to the clicked entry

function openEntryDetails (entryElement) {
  currentEntryElement = entryElement // Store the reference to the clicked entry
  document.getElementById('details-title').textContent = entryElement.textContent
  document.getElementById('details-info').textContent = entryElement.dataset.info
  document.getElementById('details-title-input').value = entryElement.textContent
  document.getElementById('details-info-textarea').value = entryElement.dataset.info
  dayViewContainer.classList.add('hidden')
  entryDetailsView.classList.remove('hidden')
}

function closeEntryDetails () {
  if (document.getElementById('details-title-input').classList.contains('hidden') &&
    document.getElementById('details-info-textarea').classList.contains('hidden') &&
    document.getElementById('save-details-button').classList.contains('hidden')) {
    entryDetailsView.classList.add('hidden')
    dayViewContainer.classList.remove('hidden')
  } else {
    document.getElementById('details-title-input').classList.add('hidden')
    document.getElementById('details-info-textarea').classList.add('hidden')
    document.getElementById('save-details-button').classList.add('hidden')
    unhide()
  }
}

document.getElementById('edit-entry-button').addEventListener('click', function () {
  document.getElementById('details-title').classList.add('hidden')
  document.getElementById('details-info').classList.add('hidden')
  document.getElementById('edit-entry-button').classList.add('hidden')
  document.getElementById('delete-entry-button').classList.add('hidden')

  document.getElementById('details-title-input').classList.remove('hidden')
  document.getElementById('details-info-textarea').classList.remove('hidden')
  document.getElementById('save-details-button').classList.remove('hidden')
})

document.getElementById('save-details-button').addEventListener('click', function () {
  const updatedTitle = document.getElementById('details-title-input').value
  const updatedInfo = document.getElementById('details-info-textarea').value

  if (updatedTitle.trim() === '') {
    alert('Title cannot be empty. Please enter a title.')
    return // Stop execution if title is empty
  }

  document.getElementById('details-title').textContent = updatedTitle
  document.getElementById('details-info').textContent = updatedInfo

  currentEntryElement.textContent = updatedTitle // Update the title in the journal list
  currentEntryElement.dataset.info = updatedInfo // Update the info in the journal list
  unhide()
  document.getElementById('details-title-input').classList.add('hidden')
  document.getElementById('details-info-textarea').classList.add('hidden')
  document.getElementById('save-details-button').classList.add('hidden')

  // update local storage entry
  updateEntryInLocalStorage(currentEntryElement.dataset.id, updatedTitle, updatedInfo)
})

document.getElementById('delete-entry-button').addEventListener('click', function () {
  entryDetailsView.classList.add('hidden')
  dayViewContainer.classList.remove('hidden')
  removeEntryFromLocalStorage(currentEntryElement.dataset.id)
  currentEntryElement.remove()
  hasOverflow(backButton)
})

document.getElementById('back-details-button').addEventListener('click', closeEntryDetails)

document.addEventListener('keydown', function (event) {
  if (event.key === "Escape") {
    if (!dayNewEntryView.classList.contains('hidden')) {
      closeNewEntry()
    }
    else if (!entryDetailsView.classList.contains('hidden')) {
      closeEntryDetails()
    }
  }
})

/**
 * Save a given journal entry to local storage
 *
 * @param {String} id
 * @param {String} date
 * @param {String} title
 * @param {String} info
 */
function saveEntryToLocalStorage (id, date, title, info) {
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || []
  entries.push({ id, date, title, info })
  localStorage.setItem('journalEntries', JSON.stringify(entries))
}

/**
 * Validate the id
 *
 * @param {String} id
 * @returns {Boolean}
 */
function isValidId (id) {
  // Example: Ensure id is a non-empty string
  return typeof id === 'string' && id.trim().length > 0
}

/**
 * Validate the title
 *
 * @param {String} title
 * @returns {Boolean}
 */
function isValidTitle (title) {
  // Example: Ensure title is a non-empty string and meets other criteria
  return typeof title === 'string' && title.trim().length > 0
}

/**
 * Validate the info
 *
 * @param {String} info
 * @returns {Boolean}
 */
function isValidInfo (info) {
  // Example: Ensure info is a non-empty string
  return typeof info === 'string' && info.trim().length > 0
}

/**
 * Update an entry in the local storage
 *
 * Specifically for editing and updating an existing entry
 * based on the index and id
 *
 * @param {String} id
 * @param {String} title
 * @param {String} info
 */
function updateEntryInLocalStorage (id, title, info) {
  const entries = JSON.parse(localStorage.getItem('journalEntries')) || []
  const entryIndex = entries.findIndex(entry => entry.id === id)

  // Validate and sanitize inputs
  if (!isValidId(id) || !isValidTitle(title) || !isValidInfo(info)) {
    console.error('Invalid input data')
    return
  }

  if (entryIndex > -1) {
    const entry = entries[entryIndex]
    entry.title = title
    entry.info = info
    localStorage.setItem('journalEntries', JSON.stringify(entries))
  }
}

/**
 * Remove an entry from local storage
 *
 * Filter through to find the entry with a given id
 * and remove it from the local storage
 *
 * @param {String} id
 */
function removeEntryFromLocalStorage (id) {
  let entries = JSON.parse(localStorage.getItem('journalEntries')) || []
  entries = entries.filter(entry => entry.id !== id)
  localStorage.setItem('journalEntries', JSON.stringify(entries))
}

/**
 * Tracks the changes in a given element
 *
 * Meant to add event listeners to the list items
 * in the day view so that they can be editable with
 * a click after
 *
 * @param {Array} mutationsList is the list of mutations in the DOM
 */
function onClassListChange (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.attributeName === 'class') {
      console.log('Class list changed:', mutation.target.classList)
      if (!mutation.target.classList.contains('hidden')) {
        // Perform actions when the element is shown

        // Select the parent element with the ID 'journal-list'
        const journalList = document.getElementById('journal-list')

        // Query all the <li> elements within the 'journal-list' element
        const entries = journalList.querySelectorAll('li')

        // Add an event listener to each entry
        entries.forEach(entry => {
          entry.addEventListener('click', function () {
            openEntryDetails(entry)
          })
        })
      }
    }
  }
}

/**
 * Configures the tracking of changes in a
 * given element
 *
 * Sets up a MutationObserver based on which HTML
 * elements need to be observed and configures them
 * to be tracked
 *
 * @param {HTMLElement} element
 */
function observeElementClasses (element) {
  const observer = new MutationObserver(onClassListChange)
  const config = { attributes: true, attributeFilter: ['class'] }
  observer.observe(element, config)
}

// Start observing the class list changes
observeElementClasses(dayViewContainer)
observeElementClasses(dayNewEntryView)
