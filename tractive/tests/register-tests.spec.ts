import { emit } from 'process';
import { RegisterationPage } from '../pages/registerationPage';
import { loadTestData } from '../utils/helpers'
import { test, expect, BASE_URL } from './fixture'
import { SettingsPage } from '../pages/settingsPage';
import { error } from 'console';



let registerPage: RegisterationPage;
let settingsPage: SettingsPage




test.describe('Data Driven Tests', () => {
    const testData = loadTestData('RegisterData'); // Load the test data

    // Loop through the test data and run the test for each set of credentials
    testData.forEach((data: { case: string; fname: string; lname: string; email: string; password: string; error: string }) => {
        test(`Register with ${data.case}`, async ({ loginPage, page }) => {

            await loginPage.goToCreateAccount();
            registerPage = new RegisterationPage(page);
            await registerPage.register(data.fname, data.lname, data.email, data.password);

            if (data.case === 'Valid Register') {
                await registerPage.clickOnCreateAccount();
                settingsPage = new SettingsPage(page);
                await settingsPage.validatePageTitle();

            }
            else {

                await registerPage.validateRegistration(data.case, data.error);
            }


        });


    });
});
