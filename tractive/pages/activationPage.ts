import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';


export class ActivationPage extends BasePage{
  readonly pageTitle: Locator;
 






  constructor(page: Page) {
    super(page);
    this.pageTitle  = page.locator('//*[@class="activation-header"]');
 


  }

  async validateActivationPageTitle(){
    await expect(this.pageTitle).toBeVisible();
    const title = await this.pageTitle.textContent();

    // Assert that the attribute value is what you expect
    expect(title).toBe('Enter Tracker ID');
  
}
}