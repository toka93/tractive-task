import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForPageToBeLoaded() {
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('networkidle');
      }
//  // Common method to wait for an element to be visible
//  async waitForVisibility(selector: string): Promise<void> {
//     await this.page.waitForSelector(selector, { state: 'visible' });
// }
}