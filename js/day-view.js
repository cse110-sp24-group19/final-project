const dayViewContainer = document.querySelector('.day-view');

// Check if there is overflow in the day-view container
const hasOverflow = dayViewContainer.scrollHeight > dayViewContainer.clientHeight;

// Set the position of the back button based on overflow
const backButton = document.querySelector('.back-button');
if (hasOverflow) {
  backButton.style.position = 'relative';
} else {
  backButton.style.position = 'absolute';
}
