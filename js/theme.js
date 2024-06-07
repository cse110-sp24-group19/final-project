// Magic Numbers
const DAY_THEME = 'day'
const SUNSET_THEME = 'sunset'
const NIGHT_THEME = 'night'

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

  forestBg.style.backgroundSize = 'auto 100%, cover'
  forestBg.style.backgroundRepeat = 'no-repeat'
  forestBg.style.backgroundPosition = 'bottom center'
  forestBg.style.backgroundBlendMode = 'multiply'
}

// Add a click event listener to the 'sun-moon' element
sunMoon.addEventListener('click', function () {
  const currentSunMoon = sunMoon.style.backgroundImage

  // Change night to day
  if (currentSunMoon.includes('Moon.gif')) {
    setTheme(DAY_THEME)
    localStorage.setItem('theme', DAY_THEME)
  // Change day to sunset
  } else if (currentSunMoon.includes('Sun-bright.gif')) {
    setTheme(SUNSET_THEME)
    localStorage.setItem('theme', SUNSET_THEME)
  // Change sunset to night
  } else {
    setTheme(NIGHT_THEME)
    localStorage.setItem('theme', NIGHT_THEME)
  }
})

window.addEventListener('DOMContentLoaded', function () {
  // set the theme based on what is in local storage
  const theme = localStorage.getItem('theme')

  if (theme) {
    setTheme(theme)
  } else {
    setTheme(NIGHT_THEME)
  }
})
