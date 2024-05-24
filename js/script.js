// Add an event listener to the document that listens for mouse movement
document.addEventListener('mousemove', function (e) {
  createStar(e.clientX, e.clientY)
})

/**
* Creates a star at the specified (x, y) position
* This function is used to create a star trace effect as the mouse moves
*/
function createStar (x, y) {
  const star = document.createElement('div')
  star.classList.add('star')
  star.style.left = `${x}px`
  star.style.top = `${y}px`
  document.body.appendChild(star)

  // Remove the star after the animation completes
  setTimeout(() => {
    star.remove()
  }, 1000)
}

// Get the elements with the IDs 'sun-moon' and 'forest-background'
const sunMoon = document.getElementById('sun-moon')
const forestBg = document.getElementById('forest-background')
const stars = document.querySelectorAll('.stars') // Select all elements with the class 'stars'

if (!sunMoon.style.backgroundImage) {
  sunMoon.style.backgroundImage = "url('assets/Moon.gif')"
}

// Add a click event listener to the 'sun-moon' element
sunMoon.addEventListener('click', function () {
  const currentSunMoon = sunMoon.style.backgroundImage

  // Change night to day
  if (currentSunMoon.includes('Moon.gif')) {
    sunMoon.style.backgroundImage = "url('assets/Sun-bright.gif')"
    forestBg.style.background = "linear-gradient(315deg, #ffffff 0%, #abd8ff 74%), url('assets/forest.svg')"
    stars.forEach(star => {
      star.style.display = 'none'
    })
  // Change day to sunset
  } else if (currentSunMoon.includes('Sun-bright.gif')) {
    sunMoon.style.backgroundImage = "url('assets/Sun-dim.gif')"
    forestBg.style.background = "linear-gradient(to bottom, #ff7e5f, #feb47b), url('assets/forest.svg')"
  // Change sunset to night
  } else {
    sunMoon.style.backgroundImage = "url('assets/Moon.gif')"
    forestBg.style.background = "linear-gradient(to bottom, blue, #feb47b), url('assets/forest.svg')"
    stars.forEach(star => {
      star.style.display = 'block'
    })
  }

  forestBg.style.backgroundSize = 'cover'
  forestBg.style.backgroundRepeat = 'no-repeat'
  forestBg.style.backgroundPosition = 'center'
})

// New event listeners for label management
document.addEventListener('DOMContentLoaded', () => {
  const labelList = document.getElementById('label-list');
  const defaultLabels = [
    { name: 'Free-write', color: '#ff69b4' },
    { name: 'Personal Related', color: '#1e90ff' },
    { name: 'Work Related', color: '#32cd32' },
    { name: 'Unfiled', color: '#ff8c00' }
  ];

  if (labelList) {
    // Initialize default labels
    defaultLabels.forEach(label => {
      createLabel(label.name, label.color);
    });

    labelList.addEventListener('click', handleLabelClick);
  }

  const labelForm = document.getElementById('label-form');
  if (labelForm) {
    labelForm.addEventListener('submit', handleLabelSubmit);
  }
});

// New code to handle label creation, editing, and deletion

function handleLabelSubmit(event) {
  event.preventDefault();
  
  const labelName = document.getElementById('label-name').value.trim();
  const labelColor = document.getElementById('label-color').value;

  if (labelName) {
    const existingLabel = document.querySelector(`li[data-name="${labelName}"]`);

    if (existingLabel) {
      editLabel(existingLabel, labelName, labelColor);
    } else {
      createLabel(labelName, labelColor);
    }

    document.getElementById('label-name').value = '';
  }
}

function createLabel(name, color) {
  const labelList = document.getElementById('label-list');
  const newLabel = document.createElement('li');
  
  newLabel.classList.add('label-item');
  newLabel.setAttribute('data-name', name);
  newLabel.innerHTML = `
    <span class="color-box" style="background-color: ${color};"></span>
    <span class="label-name">${name}</span>
    <button class="edit-label">Edit</button>
    <button class="delete-label">Delete</button>
  `;

  labelList.appendChild(newLabel);
}

function editLabel(labelElement, name, color) {
  labelElement.querySelector('.color-box').style.backgroundColor = color;
  labelElement.querySelector('.label-name').textContent = name;
  labelElement.setAttribute('data-name', name);
}

function handleLabelClick(event) {
  if (event.target.classList.contains('delete-label')) {
    const labelElement = event.target.closest('.label-item');
    deleteLabel(labelElement);
  } else if (event.target.classList.contains('edit-label')) {
    const labelElement = event.target.closest('.label-item');
    const labelName = prompt('Enter new label name:', labelElement.querySelector('.label-name').textContent);
    const labelColor = prompt('Enter new label color (hex):', labelElement.querySelector('.color-box').style.backgroundColor);
    
    if (labelName && labelColor) {
      editLabel(labelElement, labelName, labelColor);
    }
  }
}

function deleteLabel(labelElement) {
  labelElement.remove();
}
