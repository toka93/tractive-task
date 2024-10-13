import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import {  PageHeadline } from '../sharedComponents/pageHeadline';
import { LanguageDDL  } from '../sharedComponents/languageDDL';


export class LoginPage extends BasePage{
  private languageDDL: LanguageDDL;
  private pageHeadline : PageHeadline
  readonly baseUrl: string;
  readonly emailTextField: Locator;
  readonly passwordTextField: Locator;
  readonly loginButton: Locator;
  readonly createAccountButton: Locator;
  readonly forgetPasswordButtton: Locator;
  readonly appleButtton: Locator;
  readonly errorMessage : Locator;





  constructor(page: Page, baseUrl: string) {
    super(page);
    this.baseUrl = baseUrl;
    this.emailTextField = page.locator('input[type="email"]');
    this.passwordTextField = page.locator('input[type="password"]');
    this.loginButton = page.locator('//button[@type="submit"]');
    this.createAccountButton=page.locator('//a[@href="#/signup"]');
    this.forgetPasswordButtton = page.getByText('Forgot password?');
    this.appleButtton = page.getByRole('button', { name: 'Sign in with Apple' });
    this.errorMessage = page.getByLabel('Looks like you entered a');
    this.languageDDL=new LanguageDDL(page);
    this.pageHeadline=new PageHeadline(page);


  }


  async enterloginData(email: string, password: string) {
    await this.emailTextField.fill(email);
    await this.passwordTextField.fill(password);
    

  }
  async clickOnLogin()
  {
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');  
  }
 
  async validateLogin()
  {
    await this.page.waitForURL(this.baseUrl + '/#/settings/');
  }
  async navigate() {
    await this.page.goto(this.baseUrl);
    
  }
  async goToCreateAccount() {
    await this.createAccountButton.click();
    
  }
  

  async validateErrorMessage(error:string)
  {
  const errorMessage= await this.errorMessage.textContent();
  expect(errorMessage,error).toBe(error);
  }
 
  async validateSigninButtonIsDisabled()
  {
   return await this.loginButton.isDisabled();

  }

  async chooseLanguage(language:string)
  {
   await this.languageDDL.chooseLanguage(language);

  }

  async validateHeadline(title:string)
  {
    await this.waitForPageToBeLoaded();
    await this.pageHeadline.validateHeadline(title);
  }
}