// This script is injected into the ERP portal page to extract attendance data.

function extractAttendanceData() {
  // --- Step 1: Find the elements on the page ---

  // Selector for the subject name, based on your previous screenshot.
  const subjectNameElem = document.querySelector('h6.py-1.text-white');

  // UPDATED: This selector is now based on the new screenshot of the table.
  // It selects all table rows (tr) inside the table body (tbody).
  const attendanceRows = document.querySelectorAll('.table-responsive tbody tr');

  // --- Error Handling: Check if elements were found ---
  if (!subjectNameElem) {
    return { error: "Could not find the subject's name on the page. Please check the selectors in content.js." };
  }
  if (attendanceRows.length === 0) {
    return { error: "Could not find any attendance data rows. Please check the table row selector in content.js." };
  }

  // --- Step 2: Extract and clean the data ---

  // Get the full text (e.g., "Attendance Report (Subject Name, Compulsory)")
  let fullSubjectText = subjectNameElem.innerText;

  // Clean the text to get just the subject name.
  const match = fullSubjectText.match(/\(([^,]+)/);
  const subjectName = match ? match[1].trim() : fullSubjectText.trim();

  let attendedClasses = 0;
  let totalClasses = 0;

  // --- Step 3: Loop through the table to count attendance ---
  attendanceRows.forEach(row => {
    // Check the text content of the second cell (td) in the row for "PRESENT" or "ABSENT".
    // This is more specific and avoids accidentally counting header rows.
    const statusCell = row.querySelector('td:nth-child(2)'); // Get the second column
    if (statusCell) {
      const rowText = statusCell.innerText.toUpperCase();

      if (rowText.includes('PRESENT')) {
        attendedClasses++;
        totalClasses++;
      } else if (rowText.includes('ABSENT')) {
        totalClasses++;
      }
    }
  });
  
  // --- Step 4: Return the final calculated data ---
  const absentClasses = totalClasses - attendedClasses;
  return {
    subjectName: subjectName,
    attended: attendedClasses,
    total: totalClasses,
    absent: absentClasses // Add absent count to the returned data
  };
}

// --- Step 5: Send the data back to the popup ---
// We wrap this in a try-catch block to handle any unexpected errors during extraction.
try {
  const data = extractAttendanceData();
  chrome.runtime.sendMessage({ attendanceData: data });
} catch (e) {
  chrome.runtime.sendMessage({ error: "An unexpected error occurred: " + e.message });
}

