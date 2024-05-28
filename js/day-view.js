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

/* 
function deleteEntry (event) {
  const buttonClicked = event.target
  const liToDelete = buttonClicked.parentElement
  liToDelete.remove()

  // make sure to check there is no overflow
  hasOverflow()
}
*/

hasOverflow()

/*
document.querySelectorAll('.delete-button').forEach(button => {
  button.onclick = deleteEntry
}) 
*/

document.querySelectorAll('.add-button').forEach(button => {
  button.onclick = addNewEntry
})

document.getElementById('journal-list').addEventListener('click', function(event) {
  // Check if the click occurred on a delete button
  if (event.target.classList.contains('delete-button')) {
    // Remove the parent list item of the clicked delete button
    event.target.parentElement.remove();
  }
  hasOverflow()
});

function addNewEntry() {
  // Get the input value
  const newEntryInput = document.getElementById('new-entry-input');
  const newEntryText = newEntryInput.value.trim();

  // If the input is not empty, add a new list item with the entry
  if (newEntryText !== '') {
    const journalList = document.getElementById('journal-list');
    const newListItem = document.createElement('li');
    newListItem.innerHTML = `
      <p>${newEntryText}</p>
      <button class="edit-button" onclick="">Edit</button>
      <button class="delete-button" onclick="">Delete</button>
    `;
    journalList.insertBefore(newListItem, document.getElementById('new-entry'));

    // Clear the input for the next entry
    newEntryInput.value = '';
  }
}


