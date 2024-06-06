import Character from './Character.js'
document.addEventListener('DOMContentLoaded', function () {
  // Select the main character selection container and it's children
  const characterSelectionContainer = document.getElementById('character-selection-container')
  const dragonContainer = document.getElementById('dragon-container')
  const monkeyContainer = document.getElementById('monkey-container')
  // Hide if a character has been saved already
  if (Character.checkStorage()) {
    characterSelectionContainer.classList.add('hidden')
  } else {
    characterSelectionContainer.classList.remove('hidden')
    // dragonContainer.classList.remove('hidden')
    // characterSelectionContainer.classList.remove('hidden')
    // charDesc.classList.remove('hidden')
  }
  // Add click event listener for the dragon container
  dragonContainer.addEventListener('click', function () {
    console.log('Dragon selected')
    characterSelectionContainer.classList.add('hidden')
    const character = new Character('Generic', 'Dragon', 0)
    character.updateProgression(0)
  })

  // Add click event listener for the monkey container
  monkeyContainer.addEventListener('click', function () {
    console.log('Monkey selected')
    characterSelectionContainer.classList.add('hidden')
    const character = new Character('Generic', 'Monkey', 0)
    character.updateProgression(0)
  })
})
