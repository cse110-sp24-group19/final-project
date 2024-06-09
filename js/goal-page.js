// fetches Character object from local storage
import Character from './Character.js'
const usercharacter = new Character(null, null, 0)

/**
 * calls Character.js method to add 1 progress point
 * to current character
 */
function updateCharacterProgression () {
  usercharacter.updateProgression(1)
}

/**
 * Increments completed goal count on rewards page
 */
function updateGoalCount () {
  Character.addGoalComplete()
}

// the following comment is necessary for the linter
/* global localStorage */

// Run init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init)

/**
 * Sets 'goals' to an empty array in local storage if it doesn't exist,
 * otherwise populates page with existing goals
 */
function init () {
  let goals = getGoalsFromStorage()
  if (goals == null) {
    goals = []
    localStorage.setItem('goals', JSON.stringify(goals))
  } else {
    populateGoals(goals)
  }
}

/**
 * Returns a parsed array of goal objects found at 'goals'
 * in loal storage
 * @returns Array<Object> - an array of goal objects
 */
function getGoalsFromStorage () {
  return JSON.parse(localStorage.getItem('goals')) || []
}

/**
 * Populates the page with goals through createNewGoal() function for
 * uncompleted goals, otherwise calls the function populateCompletedGoal
 * @param {Array<Object>} goals - {string category, string text, boolean complete, int id}
 */
function populateGoals (goals) {
  localStorage.setItem('goals', '[]')
  goals.forEach((goal) => {
    if (!goal.complete) {
      createNewGoal(goal.category, goal.text)
    } else {
      populateCompletedGoal(goal)
    }
  })
}

/**
 * Loads an existing completed  goal to the page, then
 * saves it to local storage. This additional function
 * was necessary to avoid accruing extra points each time the page is reloaded.
 * @param {Object} goal:  {string category, string text, boolean complete, int id}
 */
function populateCompletedGoal (goal) {
  // goal container
  const div = document.createElement('div')
  div.style.borderBottom = 'solid lightgray 2px'
  div.className = 'completed-goal'
  div.id = goalCounter

  const buttonsContainer = document.createElement('div')
  buttonsContainer.style.margin = '5px'
  buttonsContainer.style.float = 'right'

  const label = document.createElement('label')
  label.for = 'goal#' + goalCounter
  label.textContent = goal.text
  goalCounter++

  const checkImg = document.createElement('img')
  checkImg.classList.add('check-icon')
  checkImg.src = 'image-assets/goal_icons/checked.png'

  const trashImg = document.createElement('img')
  trashImg.src = 'image-assets/goal_icons/trash.png'
  trashImg.addEventListener('click', deleteGoal)

  buttonsContainer.appendChild(checkImg)
  buttonsContainer.appendChild(trashImg)
  div.appendChild(label)
  div.appendChild(buttonsContainer)

  const container = document.querySelector(`#${goal.category} .list-container`) // select correct container
  const buffer = container.children[container.children.length - 1] // query that containers very last element(add button)
  container.insertBefore(div, buffer) // new goal is inserted at the end of the list
  saveGoalToStorage(goal.category, goal.text, div.id, true) // true == completed
}

/**
 * Creates a goal object with the following attributes, and
 * stores it in local storaeg under 'goals'
 * @param {string} category
 * @param {string} input
 * @param {number} id
 * @param {boolean} complete
 */
function saveGoalToStorage (category, input, id, complete) {
  const goals = getGoalsFromStorage()
  const newGoal = {}
  newGoal.category = category
  newGoal.text = input
  newGoal.complete = complete
  newGoal.id = id
  goals.push(newGoal)
  localStorage.setItem('goals', JSON.stringify(goals))
}

/**
 * When a goal's text is edited: finds correct goal in local
 * storage by id and updates goal.text attribute
 * @param {number} id
 * @param {string} newText
 */
function updateGoalInStorage (id, newText) {
  const goals = getGoalsFromStorage()
  goals.forEach((goal) => {
    if (goal.id === id) {
      goal.text = newText
    }
  })
  localStorage.setItem('goals', JSON.stringify(goals))
}

/**
 * When a goal is achieved: finds correct goal in local
 * storage by id and sets 'complete' attribute to true
 * @param {number} id
 */
function markGoalCompletedInStorage (id) {
  const goals = getGoalsFromStorage()
  goals.forEach((goal) => {
    if (goal.id === id) {
      goal.complete = true
    }
  })
  localStorage.setItem('goals', JSON.stringify(goals))
}

/**
 * When user deletes a goal: finds correct goal in local
 * storage by id and removes from the array
 * @param {number} id
 */
function removeGoalFromStorage (id) {
  let goals = getGoalsFromStorage()
  goals = goals.filter(goal => goal.id !== id)
  localStorage.setItem('goals', JSON.stringify(goals))
}

let goalCounter = 0 // used to give each goal a unique id

const dailyButton = document.getElementById('add-daily-goal')
const weeklyButton = document.getElementById('add-weekly-goal')
const longTermButton = document.getElementById('add-long-term-goal')

dailyButton.addEventListener('click', () => addNewGoal('daily'))
weeklyButton.addEventListener('click', () => addNewGoal('weekly'))
longTermButton.addEventListener('click', () => addNewGoal('long-term'))

/**
 * Called when any + button is clicked. Prompts user to enter text,
 * then calls createNewGoal().
 * @param {string} category - 'daily', 'weekly', 'long-term'
 */
function addNewGoal (category) {
  const inputBox = document.getElementById(`${category}-goal-input`) // select correct category container
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
 * Allows the user to edit an existing goal, calls
 * method to update text attribute in local storage
 * @param {Event} event - The event object (click)
 */
function editGoal (event) {
  const div = event.target.parentElement.parentElement
  const label = div.querySelector('label')
  if (!label) return

  const inputBox = document.createElement('input')
  inputBox.classList.add('goal-input')
  inputBox.type = 'text'
  inputBox.value = label.textContent.trim()

  div.replaceChild(inputBox, label) // replace old label with an input box containing that label's text

  // replace input box with a new label containing edited text content
  function handleInputCommit () {
    if (inputBox.value.trim() !== '') {
      const newLabel = document.createElement('label')
      newLabel.textContent = inputBox.value.trim()
      newLabel.htmlFor = label.htmlFor
      div.replaceChild(newLabel, inputBox)
      updateGoalInStorage(div.id, newLabel.textContent)
    }
  }

  inputBox.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      handleInputCommit()
    }
  })

  inputBox.addEventListener('blur', handleInputCommit)
}

/**
 * Delete the existing goal, and calls method to remove
 * it from local storage
 * @param {Event} event - The object event (click)
 */

function deleteGoal (event) {
  const div = event.target.parentElement.parentElement
  removeGoalFromStorage(div.id)
  div.remove()
}

/**
 * Mark a goal as completed- calls methods to update object in
 * local storage and to update character progression
 * @param {Event} event - The object event
 */

function achieveGoal (event) {
  const div = event.target.parentElement.parentElement
  div.className = 'completed-goal'
  const checkIcon = div.querySelector('.check-icon')
  checkIcon.src = 'image-assets/goal_icons/checked.png'
  const penIcon = div.querySelector('.pen-icon')
  penIcon.style.display = 'none'
  markGoalCompletedInStorage(div.id)
  updateCharacterProgression()
  updateGoalCount()
}

/**
 * Creates and adds a new goal to approporiate list
 * @param {string} category - 'daily', 'weekly', 'long-term'
 * @param {string} input - the text input for the label
 */
function createNewGoal (category, input) {
  const div = document.createElement('div')
  div.style.borderBottom = 'solid lightgray 2px'
  div.id = goalCounter

  const label = document.createElement('label')
  label.for = 'goal#' + goalCounter
  label.textContent = input
  goalCounter++

  const buttonsContainer = document.createElement('div')
  buttonsContainer.style.margin = '5px'
  buttonsContainer.style.float = 'right'

  const checkImg = document.createElement('img')
  checkImg.classList.add('check-icon')
  checkImg.src = 'image-assets/goal_icons/check.png'
  checkImg.addEventListener('click', achieveGoal)

  const penImg = document.createElement('img')
  penImg.classList.add('pen-icon')
  penImg.src = 'image-assets/goal_icons/pen.png'
  penImg.addEventListener('click', editGoal)

  const trashImg = document.createElement('img')
  trashImg.src = 'image-assets/goal_icons/trash.png'
  trashImg.addEventListener('click', deleteGoal)

  buttonsContainer.appendChild(checkImg)
  buttonsContainer.appendChild(penImg)
  buttonsContainer.appendChild(trashImg)
  div.appendChild(label)
  div.appendChild(buttonsContainer)

  const container = document.querySelector(`#${category} .list-container`) // select correct container
  const buffer = container.children[container.children.length - 1] // query that containers very last element(add button)
  container.insertBefore(div, buffer) // new goal is inserted at the end of the list
  saveGoalToStorage(category, input, div.id, false) // false == not completed
}
