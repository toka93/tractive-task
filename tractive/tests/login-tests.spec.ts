import { log } from 'console';
import { SettingsPage } from '../pages/settingsPage';
import { loadTestData } from '../utils/helpers'
import { test, expect, BASE_URL,Email,Password } from './fixture'


let settingsPage: SettingsPage




test.describe('Login Functionality  Tests', () => {
    test('Valid login test', async ({ loginPage, page }) => {
        settingsPage = new SettingsPage(page);
        await loginPage.enterloginData(Email, Password);
        await loginPage.clickOnLogin();
        await loginPage.validateLogin();
        await settingsPage.validatePageTitle();


    });
});

test.describe('Data Driven Tests', () => {
    const testData = loadTestData('loginData'); // Load the test data

    // Loop through the test data and run the test for each set of credentials
    testData.forEach((data: { case: string; email: string; password: string; error: string }) => {
        test(`login with ${data.case}`, async ({ loginPage, page }) => {
            // Use the email and password from the JSON file
            await loginPage.enterloginData(data.email, data.password);
            if (data.case === 'Invalid Data') {
                const isDisabled = await loginPage.validateSigninButtonIsDisabled();
                expect(isDisabled,'Sign in Button is Disabled').toBe(true);
            } else {
                await loginPage.clickOnLogin();
                await loginPage.validateErrorMessage(data.error);

            }
        });
    });
});


