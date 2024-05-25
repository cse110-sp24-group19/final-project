// automatically checks if there is overflow
hasOverflow()

function deleteEntry (event) {
  const buttonClicked = event.target
  const liToDelete = buttonClicked.parentElement
  liToDelete.remove()

  // make sure to check there is no overflow
  hasOverflow()
}

document.querySelectorAll('.delete-button').forEach(button => {
  button.onclick = deleteEntry
})

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
