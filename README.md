College ERP Attendance Calculator Chrome Extension
How to Install and Use
Download the files: Save all the files (manifest.json, popup.html, popup.js, content.js, background.js) into a single folder on your computer. You will also need to create an images folder and add some icons (named icon16.png, icon48.png, icon128.png).

Open Chrome Extensions: Open Google Chrome, type chrome://extensions in the address bar, and press Enter.

Enable Developer Mode: Turn on the "Developer mode" toggle in the top-right corner.

Load the Extension: Click on the "Load unpacked" button and select the folder where you saved all the files.

Go to your College ERP Portal: Navigate to the webpage where your attendance is displayed.

Calculate: Click on the extension's icon in the Chrome toolbar and then click the "Calculate" button.

IMPORTANT: Customization Required!
You must edit the content.js file and replace the placeholder selectors ('.attended-classes-selector' and '#total-classes-selector') with the actual CSS selectors for the elements that contain your attended classes and total classes on your specific ERP portal.

How to find selectors:

Right-click on the number showing your attended classes on the webpage and select "Inspect".

In the developer tools that open, find the highlighted HTML element and look for its id or class.

Do the same for the total number of classes.

Update the selectors in content.js with the ones you found. For example, if the attended classes are in a <td> with the class attendance-present, the selector would be td.attendance-present.