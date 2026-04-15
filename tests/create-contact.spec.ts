import { test, expect } from '../test-setup/fixtures';

import { LoginPage } from '../src/pages/login.page';
import { SidebarPage } from '../src/pages/sidebar.page';
import { ContactsPage } from '../src/pages/contacts.page';
import { ContactCreatePage } from '../src/pages/contact-create.page';

test.describe('Contacts', () => {
    test('Login -> Contacts -> Create Contact -> Verify created', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const sidebarPage = new SidebarPage(page);
        const contactsPage = new ContactsPage(page);
        const contactCreatePage = new ContactCreatePage(page);

        const email = 'shiva.pasunuri@qualizeal.com';
        const password = 'Singam@1308';

        const firstName = 'John';
        const lastName = 'Doe';
        const company = 'Qualizeal';
        const emailAddress = 'shiva.pasunuri@qualizeal.com';
        const number = 'text';

        await loginPage.login(email, password);
        await sidebarPage.openContacts();
        await contactsPage.waitForLoaded();
        await contactsPage.clickCreate();

        await contactCreatePage.createContact({ firstName, lastName, company, emailAddress, number });

        const expectedVerificationText = `${firstName} ${lastName}`;
        await contactCreatePage.verifyContactCreated(expectedVerificationText);

        // Additional assertion to ensure expect() is used in the spec as well.
        await expect(page.getByText(expectedVerificationText, { exact: false })).toBeVisible();
    });
});
