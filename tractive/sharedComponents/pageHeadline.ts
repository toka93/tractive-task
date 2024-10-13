import { expect, Page } from '@playwright/test';

export class PageHeadline {
    private page: Page;
    private headline = '//h1[@class="typography__headline-jumbo ng-scope"]';
   
    constructor(page: Page) {
        this.page = page;
    }

    async validateHeadline(headltext:string): Promise<void> {
        const value=await this.page.locator(this.headline).textContent();
        expect(value).toBe(headltext);
    }

   
}
