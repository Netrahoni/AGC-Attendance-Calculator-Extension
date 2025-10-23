// This script runs in the background and coordinates everything.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // Check if the message is from our popup asking to get attendance
  if (request.action === "get_attendance") {
    // Get the currently active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        sendResponse({ error: "No active tab found." });
        return;
      }
      const activeTab = tabs[0];
      
      // Inject the content script into the active tab
      chrome.scripting.executeScript(
        {
          target: { tabId: activeTab.id },
          files: ["content.js"],
        },
        (injectionResults) => {
          // Check for errors during injection or execution
          if (chrome.runtime.lastError) {
            sendResponse({ error: `Script error: ${chrome.runtime.lastError.message}` });
            return;
          }
          if (!injectionResults || injectionResults.length === 0 || !injectionResults[0].result) {
            sendResponse({ error: "Could not retrieve data from the page." });
            return;
          }
          // Send the successful result back to the popup
          sendResponse(injectionResults[0].result);
        }
      );
    });
    // Return true to indicate that we will send a response asynchronously
    return true;
  }
});
