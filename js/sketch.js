/* global p5 */

function initializeP5Sketch () {
  const canvasContainer = document.querySelector('.p5-canvas-container')

  if (canvasContainer && !canvasContainer.firstChild) {
    // Initialize the p5 sketch
    const P5 = p5
    const instance = new P5((sketch) => {
      // keep track of user's settings
      const settings = {
        pensize: 10,
        color: 'black'
      }

      // determine magic numbers
      const INCREMENT = 10
      const MAX_PENSIZE = 100

      // set up the buttons container
      const buttonContainer = sketch.createDiv()
      buttonContainer.style('display', 'flex')
      buttonContainer.style('flex-direction', 'column')
      buttonContainer.style('position', 'absolute')
      buttonContainer.style('left', '10px')
      buttonContainer.style('top', '130px')
      buttonContainer.style('background-color', 'white')
      buttonContainer.style('padding', '10px')
      buttonContainer.style('border', 'solid')
      buttonContainer.parent(canvasContainer)

      // set up the color buttons
      const colors = ['black', 'gray', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'purple']
      colors.forEach((color) => {
        const button = sketch.createButton('')
        button.style('background-color', color)
        button.style('width', '30px')
        button.style('height', '30px')
        button.style('margin', '5px')
        button.style('border-radius', '20px')
        if (color === 'white') {
          button.style('border', 'solid')
        } else {
          button.style('border', 'white')
        }
        button.style('cursor', 'pointer')
        button.parent(buttonContainer)
        button.mousePressed(() => {
          settings.color = color
        })
      })

      // buttons to change the pen size
      const increaseButton = sketch.createButton('')
      increaseButton.mousePressed(() => {
        if (settings.pensize < MAX_PENSIZE) {
          settings.pensize += INCREMENT
        }
      })
      increaseButton.style('background-color', 'white')
      increaseButton.style('width', '30px')
      increaseButton.style('height', '30px')
      increaseButton.style('margin', '30px 5px 5px 0px')
      increaseButton.style('border', 'none')
      increaseButton.style('border-radius', '10px')
      increaseButton.style('cursor', 'pointer')
      const increaseImg = sketch.createImg(
        '../assets/up_arrow.svg',
        'The p5.js magenta asterisk.'
      )
      increaseImg.style('width', '30px')
      increaseImg.style('height', '30px')
      increaseImg.parent(increaseButton)
      increaseButton.parent(buttonContainer)

      const decreaseButton = sketch.createButton('')
      decreaseButton.mousePressed(() => {
        if (settings.pensize > INCREMENT) {
          settings.pensize -= INCREMENT
        }
      })
      decreaseButton.style('background-color', 'white')
      decreaseButton.style('width', '30px')
      decreaseButton.style('height', '30px')
      decreaseButton.style('margin-top', '10px')
      decreaseButton.style('border', 'none')
      decreaseButton.style('border-radius', '10px')
      decreaseButton.style('cursor', 'pointer')
      const decreaseImg = sketch.createImg(
        '../assets/down_arrow.svg',
        'The p5.js magenta asterisk.'
      )
      decreaseImg.style('width', '30px')
      decreaseImg.style('height', '30px')
      decreaseImg.parent(decreaseButton)
      decreaseButton.parent(buttonContainer)

      // create eraser and clear all buttons
      const eraserButton = sketch.createButton('')
      eraserButton.mousePressed(() => {
        settings.color = 'white'
      })
      eraserButton.style('background-color', 'white')
      eraserButton.style('width', '30px')
      eraserButton.style('height', '30px')
      eraserButton.style('margin-top', '10px')
      eraserButton.style('border', 'none')
      eraserButton.style('border-radius', '10px')
      eraserButton.style('cursor', 'pointer')
      const eraserImg = sketch.createImg(
        '../assets/eraser.jpg',
        'The p5.js magenta asterisk.'
      )
      eraserImg.style('width', '30px')
      eraserImg.style('height', '30px')
      eraserImg.parent(eraserButton)
      eraserButton.parent(buttonContainer)

      const clearAllButton = sketch.createButton('clear')
      clearAllButton.mousePressed(() => {
        sketch.background('white')
      })
      clearAllButton.style('background-color', 'white')
      clearAllButton.style('font-weight', 'bold')
      clearAllButton.style('margin-top', '10px')
      clearAllButton.style('border', 'dotted')
      clearAllButton.style('border-radius', '10px')
      clearAllButton.style('cursor', 'pointer')
      clearAllButton.parent(buttonContainer)

      sketch.setup = () => {
        // Create canvas and attach it to the canvasContainer
        const canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight)
        canvas.parent(canvasContainer)
        sketch.background('white')
        sketch.frameRate(100)
      }

      sketch.draw = () => {
        // set color, size, etc to the settings
        sketch.stroke(settings.color)
        sketch.strokeWeight(settings.pensize)
        if (sketch.mouseIsPressed && sketch.mouseX > 100) {
          sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY)
        }
      }
    })
    console.log('Created p5 instance:', instance)
  }
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const creativePlayPage = document.getElementById('creative-play-page')

  // Create a mutation observer to detect changes in the class attribute
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (!creativePlayPage.classList.contains('hidden')) {
          // Initialize the p5 sketch if the creative-play-page is not hidden
          initializeP5Sketch()
        }
      }
    }
  })

  // Start observing the target element for attribute changes
  observer.observe(creativePlayPage, { attributes: true })

  // Check the initial visibility of the creative-play-page
  if (!creativePlayPage.classList.contains('hidden')) {
    initializeP5Sketch()
  }
})
