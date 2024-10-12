import { Page } from '@playwright/test';

export class LanguageDDL {
    private page: Page;
    private languageDDL = 'tcommon-language-selector';
   
    constructor(page: Page) {
        this.page = page;
    }

    async chooseLanguage(language:string): Promise<void> {
        await this.page.locator(this.languageDDL).click();
        await this.page.getByText(language).click();
    }

   
}
