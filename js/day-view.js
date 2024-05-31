// automatically checks if there is overflow
function hasOverflow () {
  const dayViewContainer = document.querySelector('#day-view')
  // Check if there is overflow in the day-view container
  const hasOverflow = dayViewContainer.scrollHeight > dayViewContainer.clientHeight

  // Set the position of the back button based on overflow
  const backButton = document.querySelector('.back-button')
  if (hasOverflow) {
    backButton.style.position = 'relative'
  } else {
    backButton.style.position = 'absolute'
  }
}

hasOverflow()

document.querySelectorAll('.add-button').forEach(button => {
  button.onclick = addNewEntry
})

document.getElementById('journal-list').addEventListener('click', function (event) {
  // Check if the click occurred on a delete button
  if (event.target.classList.contains('delete-button')) {
    // Remove the parent list item of the clicked delete button
    event.target.parentElement.remove()
  }
  hasOverflow()
})

function addNewEntry () {
  // Get the input value
  const newEntryInput = document.getElementById('new-entry-input')
  const newEntryText = newEntryInput.value.trim()

  // If the input is not empty, add a new list item with the entry
  if (newEntryText !== '') {
    const journalList = document.getElementById('journal-list')
    const newListItem = document.createElement('li')
    newListItem.innerHTML = `
      <p>${newEntryText}</p>
      <button class="edit-button" onclick="">Edit</button>
      <button class="delete-button" onclick="">Delete</button>
    `
    journalList.insertBefore(newListItem, document.getElementById('new-entry'))

    // Clear the input for the next entry
    newEntryInput.value = ''
  }
}

function editEntry (editButton) {
  const liToEdit = editButton.parentElement
  const pToEdit = liToEdit.querySelector('p')
  const originalText = pToEdit.innerText

  const inputField = document.createElement('textarea')
  inputField.value = originalText
  inputField.className = 'edit-text-box' // Add class name for styling

  const saveButton = document.createElement('button')
  saveButton.innerText = 'Save'
  saveButton.className = 'save-button'
  saveButton.style.marginLeft = '10px' // Add margin to the right of the Save button

  saveButton.onclick = function () {
    const updatedText = inputField.value.trim()
    if (updatedText !== '') {
      pToEdit.innerText = updatedText
      liToEdit.replaceChild(pToEdit, inputField)
      liToEdit.removeChild(saveButton)
      liToEdit.appendChild(editButton)
      liToEdit.appendChild(liToEdit.querySelector('.delete-button'))
    }
  }

  const space = document.createTextNode('\u00A0') // Add a non-breaking space
  liToEdit.replaceChild(inputField, pToEdit)
  liToEdit.removeChild(editButton)
  liToEdit.appendChild(saveButton)
  liToEdit.appendChild(space) // Add the space between buttons
  liToEdit.appendChild(liToEdit.querySelector('.delete-button'))
}

document.getElementById('journal-list').addEventListener('click', function (event) {
  if (event.target.classList.contains('edit-button')) {
    editEntry(event.target)
  }
})
