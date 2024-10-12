## UI  testscripts using Playwright and Typescript

 using page object deign pattern & Data Driven appproach.
 The Solution apply Playwright best practise, the solution is built to be easily maintained and has the ability to easily add new scope.


### setup
- npm install 
- npm init playwright@latest
- install VS code and open the containing folder 


### Running tests locally
- To run in headful mode and generate report run : `npx playwright test    --project="chrome" --headed`
- To run in headless mode and generate report run : `npx playwright test    --project="chrome"`
- Tests can run using firefox or edge by replacing "chrome" in the commands above with "edge" or "firefox"
- Report is generated with screenshots in folder with timestamp inside \playwright-report\
- Data is saved in json files.
- .env file contains : <br>
BASE_URL <br>
Cookie_Key <br>
Cookie_Value <br>
Domain <br>
Email <br>
Password <br>


### Tests implemented:
- 3 specs(Login , Registeration and Localization).
- Login Tests for valid and invalid cases.
- Registeration Tests for valid and invalid cases.
- Localization is a smoke sample script that checks for the titles in login and registeration pages for Dansk, Español 
- Tests are extendable and can easily add multiple languages and more fields to check.





