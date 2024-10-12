import { test as base, expect, Fixtures } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL || '';
const Cookie_Key = process.env.Cookie_Key || '';
const Cookie_Value = process.env.Cookie_Value || '';
const Domain = process.env.Domain || '';
const Email = process.env.Email || '';
const Password = process.env.Password|| '';

// Declare the types of your fixtures.
type MyFixtures = {
    loginPage: LoginPage;
  };

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page,context }, use) => {
    const cookie = {
            name: Cookie_Key,        // Name of the cookie
            value: Cookie_Value,     // Value of the cookie
            domain: Domain,          // Domain for the cookie
            path: '/',               // Path where the cookie is valid
            httpOnly: true,          // Set the cookie as HttpOnly
            secure: true,            // Use the cookie only on HTTPS
            expires: Date.now() / 1000 + 3600, // Cookie expires in 1 hour
          };
      
          // Add the cookie to the browser context
    await context.addCookies([cookie]);
      
    
    const loginPage = new LoginPage(page, BASE_URL);
    await loginPage.navigate();
    await loginPage.waitForPageToBeLoaded();
    
   
    await use(loginPage);
  },
});

export { expect, BASE_URL,Email, Password};
