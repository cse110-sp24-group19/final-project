class NavBar extends HTMLElement {
  constructor () {
    super()
    // Attach a shadow root to the element.
    this.attachShadow({ mode: 'open' })
    // Create the nav bar container
    const navBar = document.createElement('div')
    navBar.classList.add('nav-bar')

    // Define the nav items
    const navItems = [
      { id: 'main-page-nav', iconSrc: 'assets/monkey.png', text: 'Main Page' },
      { id: 'calendar-journal-nav', iconSrc: 'assets/calendar-nav.png', text: 'Calendar/Journal' },
      { id: 'creative-play-nav', iconSrc: 'assets/white-board-with-letters.png', text: 'Creative Play' },
      { id: 'goal-setting-nav', iconSrc: 'assets/goal-nav.png', text: 'Goal-Setting' }
    ]

    // Create and append nav items to the nav bar
    navItems.forEach(item => {
      const iconTextContainer = document.createElement('div')
      iconTextContainer.classList.add('icon-text-container')
      iconTextContainer.id = item.id // Set the id attribute
      const icon = document.createElement('img')
      icon.src = item.iconSrc
      icon.alt = item.text
      icon.classList.add('nav-icon')
      const text = document.createElement('p')
      text.textContent = item.text

      iconTextContainer.appendChild(icon)
      iconTextContainer.appendChild(text)
      navBar.appendChild(iconTextContainer)
    })

    // Append the nav bar to the shadow root
    this.shadowRoot.appendChild(navBar)

    // Apply styles to the shadow root
    const style = document.createElement('style')
    style.textContent = `
      .nav-bar {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 100px;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 50px;
        padding: 40px 0;
        font-family: comfortaa, sans-serif;
        font-size: 18px;
        background-color: white;
        z-index: 10;
      }

      .nav-icon {
        width: 30px;
        height: 30px;
      }

      .icon-text-container {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .icon-text-container:hover {
        transform: scale(1.2);
        color: #4b85e3;
        cursor: pointer;
      }

      .icon-text-container:active {
        transform: scale(1.1);
      }
    `

    this.shadowRoot.appendChild(style)
  }
}

// Define the new element
customElements.define('nav-bar', NavBar)
