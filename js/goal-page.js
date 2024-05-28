let goalCounter = 0 // used to give each goal a unique id

const dailyButton = document.getElementById('add-daily-goal')
const weeklyButton = document.getElementById('add-weekly-goal')
const longTermButton = document.getElementById('add-long-term-goal')

dailyButton.addEventListener('click', () => addNewGoal('daily'))
weeklyButton.addEventListener('click', () => addNewGoal('weekly'))
longTermButton.addEventListener('click', () => addNewGoal('long-term'))

/**
 * Called when any + button is clicked. Prompts user to enter text, then calls createNewGoal().
 * @param {string} category - 'daily', 'weekly', 'long-term'
 */
function addNewGoal (category) {
  const inputBox = document.getElementById(`${category}-goal-input`)
  inputBox.type = 'text'
  inputBox.focus()
  inputBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      const value = inputBox.value
      if (value !== '') {
        inputBox.type = 'hidden'
        inputBox.value = ''
        createNewGoal(category, value)
      }
    }
  })
}

/**
 * Allows the user to edit an existing goal.
 * @param {Event} event - The event object.
 */
function editGoal (event) {
  const div = event.target.parentElement
  const label = div.querySelector('label')
  const inputBox = document.createElement('input')
  inputBox.type = 'text'
  inputBox.value = label.textContent.trim()
  div.replaceChild(inputBox, label)

  inputBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      if (inputBox.value !== '') {
        const newLabel = document.createElement('label')
        newLabel.textContent = '  ' + inputBox.value
        newLabel.for = div.querySelector('input[type="checkbox"]').id
        div.replaceChild(newLabel, inputBox)
      }
    }
  })

  inputBox.addEventListener('blur', function () {
    const newLabel = document.createElement('label')
    newLabel.textContent = '  ' + inputBox.value
    newLabel.for = div.querySelector('input[type="checkbox"]').id
    div.replaceChild(newLabel, inputBox)
  })
}

/**
 * deleting the existing goal
 * @param {Event} event - The object event
 */

function deleteGoal (event) {
  const div = event.target.parentElement
  div.remove()
}

/**
 * Creates and adds a new goal to approporiate list
 * @param {string} category - 'daily', 'weekly', 'long-term'
 * @param {string} input - the text input for the label
 */
function createNewGoal (category, input) {
  const div = document.createElement('div')
  div.id = goalCounter
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.id = 'goal#' + goalCounter
  const label = document.createElement('label')
  label.for = checkbox.id
  label.textContent = '  ' + input
  goalCounter++
  const penImg = document.createElement('img')
  penImg.src = 'assets/goal_icons/pen.png'
  penImg.addEventListener('click', editGoal)
  const trashImg = document.createElement('img')
  trashImg.src = 'assets/goal_icons/trash.png'
  trashImg.addEventListener('click', deleteGoal)
  div.appendChild(checkbox)
  div.appendChild(label)
  div.appendChild(penImg)
  div.appendChild(trashImg)
  const container = document.getElementById(category) // select correct container
  const buffer = container.children[container.children.length - 1] // query that containers very last element(add button)
  container.insertBefore(div, buffer) // new goal is inserted at the end of the list
}
