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

Screenshots of application functionalities:
<img width="1153" alt="Screen Shot 2021-03-29 at 17 11 21" src="https://user-images.githubusercontent.com/53805189/112906904-9860ef00-90b2-11eb-8517-6a764fa6262f.png">

<img width="1187" alt="Screen Shot 2021-03-29 at 17 14 19" src="https://user-images.githubusercontent.com/53805189/112906927-9f87fd00-90b2-11eb-972e-5b88a6932c80.png">

<img width="1064" alt="Screen Shot 2021-03-29 at 17 15 55" src="https://user-images.githubusercontent.com/53805189/112906943-a6167480-90b2-11eb-934b-401af5c50568.png">
<img width="1343" alt="Screen Shot 2021-03-29 at 17 15 35" src="https://user-images.githubusercontent.com/53805189/112906947-a7e03800-90b2-11eb-8ab6-fb5a0a22ad0c.png">

