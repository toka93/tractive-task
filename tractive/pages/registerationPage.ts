import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';
import {  PageHeadline } from '../sharedComponents/pageHeadline';


export class RegisterationPage extends BasePage {
  private pageHeadline : PageHeadline
  readonly emailTextField: Locator;
  readonly firstnameTextField: Locator;
  readonly lastnameTextField: Locator;
  readonly passwordTextField: Locator;
  readonly createAccountButton: Locator;
  readonly errorMessage: Locator;
  readonly newsCheckbox: Locator;







  constructor(page: Page) {
    super(page);
    this.emailTextField = page.locator('input[name="email"]');
    this.passwordTextField = page.locator('input[type="password"]');
    this.firstnameTextField = page.locator('input[name="firstName"]');
    this.lastnameTextField = page.locator('input[name="lastName"]');
    this.createAccountButton = page.locator('//button[contains(@class,"tcommon-button")]');
    this.errorMessage = page.locator('//em[contains(text()," is ")]');
    this.newsCheckbox = page.locator('//label[@class="tcommon-check"]');
    this.pageHeadline=new PageHeadline(page);



  }


  async register(firstname: string, lastname: string, email: string, password: string) {
    await this.firstnameTextField.fill(firstname);
    await this.lastnameTextField.fill(lastname);
    await this.emailTextField.fill(email);
    await this.passwordTextField.fill(password);
    await this.newsCheckbox.click();

  }

  async clickOnCreateAccount() {
    await this.createAccountButton.click();
  }



  async waitForPageToBeLoaded() {

    await this.page.waitForTimeout(20000);
    await this.page.waitForLoadState('networkidle');
  }

  async validateRequiredFieldMessages(error: string) {
    // Find all elements 
    const requiredFieldElements = await this.errorMessage

    // Ensure there are exactly 4 elements
    const elementCount = await requiredFieldElements.count();
    expect(elementCount).toBe(4);

    // Get the text content of all `//em` elements
    const allTexts = await requiredFieldElements.allTextContents();

    // Validate that all texts are equal to error message
    allTexts.forEach(text => {
      expect(text,text).toBe(error);
    });

  }


  async validateSingleRequiredFieldMessage(error: string) {
    // Locate the first  element
    const requiredFieldElement = this.errorMessage;

    // Get the text content of the element
    const elementText = await requiredFieldElement.textContent();

    // Assert that the text is "This field is required."
    expect(elementText?.trim(),error).toBe(error);
  }


  async validateRegistration(validationCase: string, errorMessage: string) {
    switch (validationCase) {
      case 'Missing Required Fields':
        await this.validateRequiredFieldMessages(errorMessage);
        break;
      case 'Invalid Password':
      case 'Invalid Email':
        await this.validateSingleRequiredFieldMessage(errorMessage);
        break;
      case 'Existing Email':
        await this.clickOnCreateAccount();
        await this.validateSingleRequiredFieldMessage(errorMessage);
        break;
      default:
        throw new Error(`Unknown validation case: ${validationCase}`);
    }
  }

  async validateHeadline(title:string)
  {

    this.pageHeadline.validateHeadline(title);
  }
}