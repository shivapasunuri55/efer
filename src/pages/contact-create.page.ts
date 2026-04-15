import { expect } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export type ContactCreateData = {
    firstName?: string;
    lastName?: string;
    company?: string;
    emailAddress?: string;
    number?: string;
};

export class ContactCreatePage extends BasePage {
    async fillFirstName(firstName: string): Promise<void> {
        // playwright_step: await page.locator('input[name="first_name"]').fill('John');
        await ActionUtils.fill(this.page.locator('input[name="first_name"]'), firstName, { page: this.page });
    }

    async fillLastName(lastName: string): Promise<void> {
        // playwright_step: await page.locator('input[name="last_name"]').fill('Doe');
        await ActionUtils.fill(this.page.locator('input[name="last_name"]'), lastName, { page: this.page });
    }

    async fillCompany(company: string): Promise<void> {
        /**
         * NOTE: Brittle locator.
         * This was recorded as the 5th textbox on the page (nth(4)).
         * Any UI changes that add/remove/reorder textboxes may break this selector.
         */
        // playwright_step: await page.getByRole('textbox').nth(4).fill('Qualizeal');
        await ActionUtils.fill(this.page.getByRole('textbox').nth(4), company, { page: this.page });
    }

    async fillContactEmailAddress(emailAddress: string): Promise<void> {
        // playwright_step: await page.getByRole('textbox', { name: 'Email address' }).fill('shiva.pasunuri@qualizeal.com');
        await ActionUtils.fill(this.page.getByRole('textbox', { name: 'Email address' }), emailAddress, { page: this.page });
    }

    async fillNumber(number: string): Promise<void> {
        // playwright_step: await page.getByRole('textbox', { name: 'Number' }).fill('text');
        await ActionUtils.fill(this.page.getByRole('textbox', { name: 'Number' }), number, { page: this.page });
    }

    async clickSave(): Promise<void> {
        // playwright_step: await page.getByRole('button', { name: 'Save' }).click();
        await ActionUtils.click(this.page.getByRole('button', { name: 'Save' }), { page: this.page });
    }

    async createContact(contactData: ContactCreateData): Promise<void> {
        if (contactData.firstName !== undefined) {
            await this.fillFirstName(contactData.firstName);
        }
        if (contactData.lastName !== undefined) {
            await this.fillLastName(contactData.lastName);
        }
        if (contactData.company !== undefined) {
            await this.fillCompany(contactData.company);
        }
        if (contactData.emailAddress !== undefined) {
            await this.fillContactEmailAddress(contactData.emailAddress);
        }
        if (contactData.number !== undefined) {
            await this.fillNumber(contactData.number);
        }

        await this.clickSave();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyContactCreated(expectedNameOrEmail: string): Promise<void> {
        // Robust baseline assertion: after save, user should be on Contacts area.
        await expect(this.page).toHaveURL(/contacts/i);

        // Selectorless verification step (recorded without a selector).
        // Use a resilient text-based assertion until a stable UI locator is identified.
        await expect(this.page.getByText(expectedNameOrEmail, { exact: false })).toBeVisible();
    }
}
