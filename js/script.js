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
