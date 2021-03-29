My **own Slack bot** that receives food orders and saves them in a google spreadsheet (Generates a sheet of the day), also has functions to create, delete, join, leave and view groups.

It also has designed a web page where you can see the orders / groups that are inside the spreadsheet and also you can add an order from a form on the page.

**Steps to configure with credentials:**

1) Create the bot within the Slack workspace. Change your bot's token in src / Bot / bot.js

2) Create a spreadsheet in google drive and copy the code docs.google.com/spreadsheets/d/1DCY1bE5JaMIFGPZG0QZz3YHlEEbQbbJPAwhf43QZLto in src / spreedsheet.js

3) Get credentials by creating a project in google API. We create a project.

We enable the Goggle Drive API (API confi for node / app data). Credentials Role (Project -> Edit) / Json. Json file move to json folder inside project(You can change the name of the file).

And also We enable Google Sheet API.

4) In our spreadsheet inside Google Drive, we click on the Share button (we must share our sheet with our project). We go to the Json file inside the credentials, we copy the client-email: "**google .. @ ...**". and we put it to be shared with this email.

5) Ready our project is configured and we can use its functions.



To start the whole application, start the src / index.js, which starts the server and the bot.
