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
      { id: 'main-nav', iconSrc: 'assets/monkey.png', text: 'Main Page' },
      { id: 'calendar-journal-nav', iconSrc: 'assets/calendar-nav.png', text: 'Calendar/Journal' },
      { id: 'creative-play-nav', iconSrc: 'assets/white-board-with-letters.png', text: 'Creative Play' },
      { id: 'goal-setting-nav', iconSrc: 'assets/goal-nav.png', text: 'Goal-Setting' },
      { id: 'reward-nav', iconSrc: 'assets/reward.png', text: 'Reward' }
    ]

    // Create and append nav items to the nav bar
    navItems.forEach(item => {
      const iconTextContainer = document.createElement('div')
      iconTextContainer.classList.add('icon-text-container')
      iconTextContainer.classList.add(item.id)
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
        gap: 6vw;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        padding: 15px 0;
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
        flex-wrap: wrap;
      }

      .icon-text-container:hover {
        transform: scale(1.2);
        color: #4b85e3;
        cursor: pointer;
      }

      .icon-text-container:active {
        transform: scale(1.1);
      }

      /* Responsive Styles */
      @media (max-width: 1100px) {
        .nav-bar {
          gap: 4vw;
          padding: 10px 0;
        }
        .nav-icon {
          width: 25px;
          height: 25px;
        }
        .icon-text-container {
          gap: 5px;
          font-size: 16px;
        }
      }

      @media (max-width: 800px) {
        .nav-icon {
          display: none;
        }
        .icon-text-container {
          font-size: 16px;
        }
      }

      @media (max-width: 650px) {
        .icon-text-container {
          font-size: 12px;
        }
      }
    `

    this.shadowRoot.appendChild(style)
  }

  connectedCallback () {
    // Add event listeners for nav items
    this.shadowRoot.querySelectorAll('.icon-text-container').forEach(item => {
      item.addEventListener('click', () => {
        const pageId = item.classList[1] // The second class is the page ID
        document.querySelectorAll('.page').forEach(page => {
          if (page.id === pageId.replace('-nav', '-page')) {
            page.classList.remove('hidden')
          } else {
            page.classList.add('hidden')
          }
        })
      })
    })
  }
}

// Define the new element
customElements.define('nav-bar', NavBar)

// Event listener to navigate from the main page
document.addEventListener('DOMContentLoaded', function () {
  const mainPage = document.getElementById('main-page')
  const calendarJournalPage = document.getElementById('calendar-journal-page')
  const creativePlayPage = document.getElementById('creative-play-page')
  const goalSettingPage = document.getElementById('goal-setting-page')
  const rewardPage = document.getElementById('reward-page')

  const calendarJournalPageNav = document.getElementById('calendar-journal')
  const creativePlayPageNav = document.getElementById('creative-play')
  const goalSettingPageNav = document.getElementById('goal-setting')
  const rewardPageNav = document.getElementById('reward')

  // Function to show one page and hide others
  function showPage (pageToShow) {
    [mainPage, calendarJournalPage, creativePlayPage, goalSettingPage,rewardPage].forEach(page => {
      if (page === pageToShow) {
        page.classList.remove('hidden')
      } else {
        page.classList.add('hidden')
      }
    })
  }

  // Add click event listener to calendar/journal page navigation button
  calendarJournalPageNav.addEventListener('click', function () {
    showPage(calendarJournalPage)
  })

  // Add click event listener to creative play page navigation button
  creativePlayPageNav.addEventListener('click', function () {
    showPage(creativePlayPage)
  })

  // Add click event listener to goal setting page navigation button
  goalSettingPageNav.addEventListener('click', function () {
    showPage(goalSettingPage)
  })

  // Add click event listener to reward page navigation button
  rewardPageNav.addEventListener('click', function () {
    showPage(rewardPage)
  })
})
