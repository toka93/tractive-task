import { log } from 'console';
import { SettingsPage } from '../pages/settingsPage';
import { loadTestData } from '../utils/helpers'
import { test, expect, BASE_URL, Email, Password } from './fixture'


let settingsPage: SettingsPage




test.describe('Data Driven Localization Tests', () => {
    const testData = loadTestData('LocalizationData'); // Load the test data

    // Loop through the test data and run the test for each set of credentials
    testData.forEach((data: { language: string; title: string }) => {
        test(`check Localization with ${data.language}`, async ({ loginPage, page }) => {
            //wait for request to change language
            const responsePromise = page.waitForResponse('https://graph-stage.tractive.com/3/analytics/log');
            // Use the language and title from the JSON file
            await loginPage.chooseLanguage(data.language);
            const response = await responsePromise;
            await loginPage.validateHeadline(data.title);
            await loginPage.goToCreateAccount();
            await loginPage.validateHeadline(data.title);
        });
    });
});



