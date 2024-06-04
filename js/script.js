// Magic Numbers
const DAY_THEME = 'day'
const SUNSET_THEME = 'sunset'
const NIGHT_THEME = 'night'

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

// set the theme
function setTheme (theme) {
  if (theme === DAY_THEME) {
    sunMoon.style.backgroundImage = "url('assets/Sun-bright.gif')"
    forestBg.style.background = "linear-gradient(315deg, #ffffff 0%, #abd8ff 74%), url('assets/forest.svg')"
    stars.forEach(star => {
      star.style.display = 'none'
    })
  } else if (theme === SUNSET_THEME) {
    sunMoon.style.backgroundImage = "url('assets/Sun-dim.gif')"
    forestBg.style.background = "linear-gradient(to bottom, #ff7e5f, #feb47b), url('assets/forest.svg')"
  } else if (theme === NIGHT_THEME) {
    sunMoon.style.backgroundImage = "url('assets/Moon.gif')"
    forestBg.style.background = "linear-gradient(to bottom, blue, #feb47b), url('assets/forest.svg')"
    stars.forEach(star => {
      star.style.display = 'block'
    })
  }
}

// Add a click event listener to the 'sun-moon' element
sunMoon.addEventListener('click', function () {
  const currentSunMoon = sunMoon.style.backgroundImage

  // Change night to day
  if (currentSunMoon.includes('Moon.gif')) {
    localStorage.setItem('theme', DAY_THEME)
    setTheme(DAY_THEME)
  // Change day to sunset
  } else if (currentSunMoon.includes('Sun-bright.gif')) {
    localStorage.setItem('theme', SUNSET_THEME)
    setTheme(SUNSET_THEME)
  // Change sunset to night
  } else {
    localStorage.setItem('theme', NIGHT_THEME)
    setTheme(NIGHT_THEME)
  }

  forestBg.style.backgroundSize = 'cover'
  forestBg.style.backgroundRepeat = 'no-repeat'
  forestBg.style.backgroundPosition = 'center'
})

window.addEventListener('DOMContentLoaded', function () {
  // set the theme based on what is in local storage
  const theme = localStorage.getItem('theme')

  if (theme) {
    setTheme(theme)
  }
})
