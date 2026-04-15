import { Browser, BrowserContext, Locator, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class ContactsPage extends BasePage {
    private readonly createContactLink: Locator;

    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
        this.createContactLink = this.page.getByRole('link', { name: 'Create' });
    }

    async waitForLoaded(): Promise<void> {
        await this.createContactLink.waitFor({ state: 'visible' });
    }

    async clickCreate(): Promise<void> {
        // Recorded step: await page.getByRole('link', { name: 'Create' }).click();
        await ActionUtils.click(this.createContactLink, { page: this.page });
    }
}
