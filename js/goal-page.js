window.addEventListener("DOMContentLoaded", init);

function init() {
  let goals = getGoalsFromStorage()
  if (goals == null){
    goals = []
    localStorage.setItem('goals', JSON.stringify(goals))
  }
  else{
    populateGoals(goals)
  }
}

function getGoalsFromStorage(){
  return JSON.parse(localStorage.getItem('goals'))
}

function populateGoals(goals){
  localStorage.setItem('goals', '[]')
  goals.forEach((goal) => {
    if (!goal.complete){
      createNewGoal(goal.category, goal.text)
    }
  })
}

function saveGoalToStorage(category, input, id){
  let goals = getGoalsFromStorage()
  let newGoal = {}
  newGoal.category = category
  newGoal.text = input
  newGoal.complete = false
  newGoal.id = id
  goals.push(newGoal)
  localStorage.setItem('goals', JSON.stringify(goals))
}

function updateGoalInStorage(id, newText){
  let goals = getGoalsFromStorage()
  goals.forEach((goal) => {
    if (goal.id == id){
      goal.text = newText
    }
  })
  localStorage.setItem('goals', JSON.stringify(goals))
}

function markGoalCompletedInStorage(id){
  let goals = getGoalsFromStorage()
  goals.forEach((goal) => {
    if (goal.id == id){
      goal.complete = true
    }
  })
  localStorage.setItem('goals', JSON.stringify(goals))
}

function removeGoalFromStorage(id){
  let goals = getGoalsFromStorage()
  goals = goals.filter(goal => goal.id != id)
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
  if (!label) return

  const inputBox = document.createElement('input')
  inputBox.type = 'text'
  inputBox.value = label.textContent.trim()
  inputBox.style.width = '15vw'
  inputBox.style.height = '20px'
  inputBox.style.fontFamily = 'lxgw, sans-serif'
  inputBox.style.fontSize = '18px'
  div.replaceChild(inputBox, label)

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
 * deleting the existing goal
 * @param {Event} event - The object event
 */

function deleteGoal (event) {
  const div = event.target.parentElement
  removeGoalFromStorage(div.id)
  div.remove()
}

/**
 * achieving the existing goal
 * @param {Event} event - The object event
 */

function achieved (event) {
  const div = event.target.parentElement
  div.style.textDecoration = 'line-through'
  div.style.color = 'gray'
  const checkIcon = div.querySelector('.check-icon')
  checkIcon.src = 'assets/goal_icons/checked.png'
  const penIcon = div.querySelector('.pen-icon')
  penIcon.style.display = 'none'
  markGoalCompletedInStorage(div.id)
}

/**
 * Creates and adds a new goal to approporiate list
 * @param {string} category - 'daily', 'weekly', 'long-term'
 * @param {string} input - the text input for the label
 */
function createNewGoal (category, input) {
  const div = document.createElement('div')
  div.id = goalCounter
  const label = document.createElement('label')
  label.for = 'goal#' + goalCounter
  label.textContent = input
  goalCounter++
  const checkImg = document.createElement('img')
  checkImg.classList.add('check-icon')
  checkImg.src = 'assets/goal_icons/check.png'
  checkImg.addEventListener('click', achieved)
  const penImg = document.createElement('img')
  penImg.classList.add('pen-icon')
  penImg.src = 'assets/goal_icons/pen.png'
  penImg.addEventListener('click', editGoal)
  const trashImg = document.createElement('img')
  trashImg.src = 'assets/goal_icons/trash.png'
  trashImg.addEventListener('click', deleteGoal)
  div.appendChild(label)
  div.appendChild(checkImg)
  div.appendChild(penImg)
  div.appendChild(trashImg)
  const container = document.querySelector(`#${category} .list-container`) // select correct container
  const buffer = container.children[container.children.length - 1] // query that containers very last element(add button)
  container.insertBefore(div, buffer) // new goal is inserted at the end of the list
  saveGoalToStorage(category, input, div.id)
}
