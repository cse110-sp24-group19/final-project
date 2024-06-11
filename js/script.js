// Add an event listener to the document that listens for mouse movement
document.addEventListener('mousemove', function (e) {
  createStar(e.clientX, e.clientY)
})

/**
* Creates a star at the specified (x, y) position
* This function is used to create a star trace effect as the mouse moves
*/
export function createStar (x, y) {
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
