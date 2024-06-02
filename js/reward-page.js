// reward-page.js

let progress = parseInt(localStorage.getItem('progress')) || 0
let level = parseInt(localStorage.getItem('level')) || 0

document.addEventListener('DOMContentLoaded', function () {
  updateProgressBar()
  updateLevel()
})

/**
 * This function increments the progress bar by 10% each time it is called,
 * up to a maximum of 100%.
 * If progress exceeds 100%, it resets and increases the level by 1.
 */
function increaseProgress () {
  progress += 10

  if (progress > 100) {
    progress -= 100
    level += 1
    localStorage.setItem('level', level)
    updateLevel()
    updateCharacter()
  }

  localStorage.setItem('progress', progress)
  updateProgressBar()
}

function updateProgressBar () {
  document.getElementById('progress-bar').style.width = progress + '%'
}

function updateLevel () {
  document.getElementById('level').textContent = `${level}`
}

// NIK!!
function updateCharacter () {

}

// This part should be removed eventually.
increaseProgress()

document.addEventListener('DOMContentLoaded', function () {
  // Toggles a sidebar's visibility
  const settingButton = document.getElementById('setting-button')
  const settingSidebar = document.getElementById('setting-sidebar')
  const rewardMainContent = document.getElementById('reward-main-content')
  const profilePhotos = document.querySelectorAll('.profile-photo')
  const profilePhoto = document.getElementById('profile-photo')
  const fileInput = document.getElementById('file-input')

  // Load the saved profile photo from local storage
  const savedImage = localStorage.getItem('profilePhoto')
  if (savedImage) {
    profilePhoto.src = savedImage
  }

  // Sidebar toggle functionality
  settingButton.addEventListener('click', function () {
    settingSidebar.classList.toggle('visible')
    if (settingSidebar.classList.contains('visible')) {
      rewardMainContent.style.marginRight = '300px'
      settingButton.classList.remove('rotate-right')
      settingButton.classList.add('rotate-left')
    } else {
      rewardMainContent.style.marginRight = '0'
      settingButton.classList.remove('rotate-left')
      settingButton.classList.add('rotate-right')
    }
  })

  // Change profile photo by clicking the options provided to users
  profilePhotos.forEach((photo) => {
    photo.addEventListener('click', function () {
      const currentSrc = this.src
      profilePhoto.src = `${currentSrc}`
      // Save the profile photo to local storage
      localStorage.setItem('profilePhoto', currentSrc)
    })
  })

  // Change profile photo using file input
  fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0]
    if (file && file.type.match('image.*')) {
      const reader = new FileReader()
      reader.onload = function (e) {
        const dataUrl = e.target.result
        profilePhoto.src = dataUrl
        // Save the profile photo to local storage
        localStorage.setItem('profilePhoto', dataUrl)
      }
      reader.readAsDataURL(file)
    }
  })

  // Change user name
  const userNameParagraph = document.getElementById('user-name')
  const paragraph = document.getElementById('user-name-edit')
  const inputField = document.getElementById('user-name-input-field')
  const editButton = document.getElementById('user-name-edit-button')

  // Load the saved user name from local storage
  const savedUserName = localStorage.getItem('userName')
  if (savedUserName) {
    userNameParagraph.textContent = savedUserName
    paragraph.textContent = savedUserName
  } else {
    // Set the initial value of the paragraph to the user name
    paragraph.textContent = userNameParagraph.textContent
  }

  editButton.addEventListener('click', function () {
    if (inputField.classList.contains('hidden')) {
      // Show the input field with the paragraph's current text
      inputField.value = paragraph.textContent
      inputField.classList.remove('hidden')
      paragraph.classList.add('hidden')
      this.textContent = 'Save'
    } else {
      // Save the input field's text to the paragraph and user name paragraph
      const newUserName = inputField.value
      paragraph.textContent = newUserName
      userNameParagraph.textContent = newUserName
      inputField.classList.add('hidden')
      paragraph.classList.remove('hidden')
      this.textContent = 'Edit'

      // Save the new user name to local storage
      localStorage.setItem('userName', newUserName)
    }
  })
})
