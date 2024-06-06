document.addEventListener('DOMContentLoaded', function () {
  // Select all character containers
  const characterContainers = document.querySelectorAll('.character-container')
  // Select the main character selection container
  const characterSelectionContainer = document.getElementById('character-selection-container')

  // Add click event listener to each character container
  characterContainers.forEach(container => {
    container.addEventListener('click', function () {
      // Add the hidden class to the main container
      characterSelectionContainer.classList.add('hidden')
    })
  })
})
