// script.js

let previousPageId = 'main-page'; // Initialize with a default page

// Function to handle the search form submission
document.getElementById('search-bar').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const query = event.target.query.value.trim();
  if (query) {
    // For demonstration, we'll just create some dummy search results
    const searchResults = [
      { title: 'Result 1', description: 'Description for result 1' },
      { title: 'Result 2', description: 'Description for result 2' },
      { title: 'Result 3', description: 'Description for result 3' }
    ];
    
    displaySearchResults(searchResults);
  }
});

// Function to display search results
function displaySearchResults(results) {
  const searchResultsPage = document.getElementById('search-results-page');
  const searchResultsList = document.getElementById('search-results-list');
  
  // Clear previous search results
  searchResultsList.innerHTML = '';
  
  // Append new search results
  results.forEach(result => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${result.title}</strong><p>${result.description}</p>`;
    searchResultsList.appendChild(listItem);
  });

  // Store the current page as the previous page
  previousPageId = getCurrentPageId();

  // Show the search results page
  showPage('search-results-page');
}

// Function to show a specific page and hide others
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    if (page.id === pageId) {
      page.classList.remove('hidden');
    } else {
      page.classList.add('hidden');
    }
  });
}

// Function to get the current visible page ID
function getCurrentPageId() {
  const pages = document.querySelectorAll('.page');
  for (const page of pages) {
    if (!page.classList.contains('hidden')) {
      return page.id;
    }
  }
  return null;
}

// Function to go back to the previous page
function goBackToPreviousPage() {
  showPage(previousPageId);
}

// Ensure the function is available in the global scope
window.goBackToPreviousPage = goBackToPreviousPage;
