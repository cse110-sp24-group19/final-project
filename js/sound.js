// Get references to the elements
const calendarJournal = document.getElementById('calendar-journal')
const creativePlay = document.getElementById('creative-play')
const goalSetting = document.getElementById('goal-setting')
const sunMoon = document.getElementById('sun-moon')
const questionMark = document.getElementById('question-mark')

// Function to play a specific audio file
function playAudio (audioPath) {
  const audio = new Audio(audioPath)
  audio.play()
}

// Add event listeners to the elements
[calendarJournal, creativePlay, goalSetting].forEach(element => {
  element.addEventListener('mouseenter', function () {
    playAudio('assets/click.mp3')
  })
})

sunMoon.addEventListener('mouseenter', function () {
  playAudio('assets/pop.mp3')
})

// Add event listener for questionMark element
questionMark.addEventListener('mouseenter', function () {
  playAudio('assets/multi-pop.mp3')
})
