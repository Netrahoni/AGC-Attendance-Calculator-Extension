document.addEventListener('DOMContentLoaded', () => {
  // Try to execute the content script as soon as the popup is opened
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Check if the URL is a valid http/https url to prevent errors on chrome:// pages
    if (tabs[0].url.startsWith('http')) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      });
    } else {
      showError("This extension cannot run on this page (e.g., chrome:// pages).");
    }
  });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.attendanceData) {
    updateUI(message.attendanceData);
  } else if (message.error) {
    showError(message.error);
  }
});

function updateUI(data) {
  // Hide loading spinner and show main content
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('mainContent').classList.remove('hidden');

  // Calculate percentage
  const percentage = data.total > 0 ? (data.attended / data.total) * 100 : 0;

  // Update UI elements with the new data
  document.getElementById('subjectName').innerText = data.subjectName;
  document.getElementById('presentCount').innerText = data.attended;
  document.getElementById('absentCount').innerText = data.absent;
  document.getElementById('totalCount').innerText = data.total;
  document.getElementById('subjectPercentage').innerText = `${percentage.toFixed(1)}%`;

  // Update progress bar
  const progressBar = document.getElementById('subjectProgressBar');
  progressBar.style.width = `${percentage}%`;

  // Change progress bar color based on percentage
  progressBar.classList.remove('status-safe', 'status-at-risk', 'status-low');
  if (percentage >= 75) {
    progressBar.classList.add('status-safe');
  } else if (percentage >= 50) {
    progressBar.classList.add('status-at-risk');
  } else {
    progressBar.classList.add('status-low');
  }
}

function showError(errorMessage) {
  // Hide loading and main content, show error message
  document.getElementById('loading').classList.add('hidden');
  document.getElementById('mainContent').classList.add('hidden');
  
  const errorDiv = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');
  
  errorText.innerText = `Error: ${errorMessage}`;
  errorDiv.classList.remove('hidden');
}

