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
  newEntry.textContent = title
  newEntry.dataset.info = info // Store the info in a data attribute
  newEntry.addEventListener('click', function () {
    openEntryDetails(newEntry) // Pass the entry element
  })
  document.getElementById('journal-list').appendChild(newEntry)

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

    document.getElementById('details-title').classList.remove('hidden')
    document.getElementById('details-info').classList.remove('hidden')
    document.getElementById('edit-entry-button').classList.remove('hidden')
    document.getElementById('delete-entry-button').classList.remove('hidden')
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

  document.getElementById('details-title').classList.remove('hidden')
  document.getElementById('details-info').classList.remove('hidden')
  document.getElementById('edit-entry-button').classList.remove('hidden')
  document.getElementById('delete-entry-button').classList.remove('hidden')

  document.getElementById('details-title-input').classList.add('hidden')
  document.getElementById('details-info-textarea').classList.add('hidden')
  document.getElementById('save-details-button').classList.add('hidden')
})

document.getElementById('delete-entry-button').addEventListener('click', function () {
  entryDetailsView.classList.add('hidden')
  dayViewContainer.classList.remove('hidden')
  currentEntryElement.remove()
  hasOverflow(backButton)
})

document.getElementById('back-details-button').addEventListener('click', closeEntryDetails)
