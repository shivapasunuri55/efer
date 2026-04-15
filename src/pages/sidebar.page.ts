import { Page, BrowserContext, Browser } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

/**
 * Encapsulates left navigation (sidebar) actions.
 */
export class SidebarPage extends BasePage {
    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
    }

    /**
     * Open Contacts section from the left navigation.
     */
    async openContacts(): Promise<void> {
        this.logStep('Open Contacts from sidebar');

        // playwright_step basis:
        // await page.getByRole('link', { name: '/uf0c0 Contacts' }).click();
        await ActionUtils.click(this.page.getByRole('link', { name: '/uf0c0 Contacts' }), { page: this.page });

        // Optional wait for Contacts page to load
        await this.page.waitForLoadState('networkidle');
    }
}
