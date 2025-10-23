College ERP Attendance Calculator & Tracker
About This Project
This is a Chrome extension built to help students at a specific college track their attendance. It has two main features:

Automatic Attendance Scraper: When you are on your college ERP portal's attendance report page for a single subject, you can click the extension icon. It will automatically read the page, count your "PRESENT" and "ABSENT" classes, and show you the total, along with your current percentage.

Multi-Subject Attendance Tracker: The extension also includes a separate, standalone dashboard (attendancecalculator.html). This tool allows you to manually add all your subjects and track their attendance in one place. It saves your data and includes a "Future Planner" to calculate how many classes you need to attend to reach a target percentage, or how many you can afford to miss.

How to Install
Since this extension is not on the Chrome Web Store, you must load it manually in "Developer mode."

Download: Download all the project files (manifest.json, popup.html, content.js, etc.) and save them together in a single folder on your computer (e.g., my-extension).

Open Chrome Extensions: Open Google Chrome, type chrome://extensions in the address bar, and press Enter.

Enable Developer Mode: In the top-right corner of the chrome://extensions page, turn on the Developer mode toggle.

Load the Extension: Click the Load unpacked button that appears. Select the entire folder (e.g., my-extension) where you saved the project files.

The extension icon (a calendar) should now appear in your Chrome toolbar.

How to Use
1. Automatic Scraper (Popup)
This feature reads the data directly from your ERP portal, one subject at a time.

Navigate to your college's ERP portal and log in.

Go to the attendance report page for a single subject.

Click the extension's icon in your Chrome toolbar.

A popup will appear, first showing a "loading" message and then displaying the calculated attendance (Present, Absent, Total, and Percentage) for that specific subject.

2. Multi-Subject Tracker (Dashboard Page)
This is a separate page for manually tracking all your subjects. The data here is not automatically linked to the scraper; you must enter it yourself.

How to Open the Dashboard:

Go to chrome://extensions.

Find the "Attendance Scraper" card and copy its ID (it's a long string of letters, e.g., aobkfbcjiefgdbibieDnaofm...).

Open a new tab and type chrome-extension://<PASTE_YOUR_ID_HERE>/attendancecalculator.html

(Example: chrome-extension://aobkfbcjiefgdbibieDnaofm/attendancecalculator.html)

Press Enter. You should bookmark this page for easy access later.

Using the Dashboard:

Add Subjects: Type a subject name in the "New subject name" box and click "Add".

Enter Data: Select a subject from the list. In the "Current Status" section, manually type in the "Classes Attended" and "Total Classes Held". Your data is saved automatically.

Plan Ahead: Use the "Future Planner" to set a target percentage or a minimum percentage and find out how many classes you need to attend or can miss.

For Developers: Customizing for a Different College
This extension is built for a specific college ERP. If you want to use this for a different college, the automatic scraper will not work until you update the code to find the correct data on your portal.

You must edit the CSS selectors in the content.js file.

Open the content.js file in a text editor.

Find these lines and change the selectors ('...') to match your portal's HTML structure:

const subjectNameElem = document.querySelector('h6.py-1.text-white');

const attendanceRows = document.querySelectorAll('.table-responsive tbody tr');

const statusCell = row.querySelector('td:nth-child(2)'); (and the rowText.includes('PRESENT') logic).

How to find your portal's selectors:

Go to your college's attendance page.

Right-click on the element you want to track (e.g., the subject name, or a row in the attendance table) and select Inspect.

The developer tools will open, highlighting the HTML for that element.

Find a unique id (e.g., #subject-name) or class (e.g., .attendance-row) for that element.

Update the document.querySelector(...) or document.querySelectorAll(...) in content.js with the selectors you found.
