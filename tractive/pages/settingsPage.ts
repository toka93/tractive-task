import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';


export class SettingsPage extends BasePage{
  readonly pageTitle: Locator;
 






  constructor(page: Page) {
    super(page);
    this.pageTitle  = page.locator('(//h1[@tcommon-title])[1]');
 


  }

  async validateSettingsPageTitle(){
    await expect(this.pageTitle).toBeVisible();
    const title = await this.page.getAttribute('(//h1[@tcommon-title])[1]', 'tcommon-title');

    // Assert that the attribute value is what you expect
    expect(title).toBe('Manage your Account');
  
}
}