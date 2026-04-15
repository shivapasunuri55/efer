import { Browser, BrowserContext, Page } from '@playwright/test';
import { BasePage } from '@/pages/base.page';
import { ActionUtils } from '@/utils/action-utils';

export class LoginPage extends BasePage {
    private readonly emailField = "getByRole('textbox', { name: 'Email' })";
    private readonly passwordField = "getByRole('textbox', { name: 'Password' })";
    private readonly loginButton = "getByText('Login')";

    constructor(page: Page, context?: BrowserContext, browser?: Browser) {
        super(page, context, browser);
    }

    async fillEmail(value: string): Promise<void> {
        this.logStep(`Fill Email: ${value}`);
        await ActionUtils.fill(this.page.getByRole('textbox', { name: 'Email' }), value, { page: this.page });
    }

    async fillPassword(value: string): Promise<void> {
        this.logStep('Fill Password');
        await ActionUtils.fill(this.page.getByRole('textbox', { name: 'Password' }), value, { page: this.page });
    }

    async clickLogin(): Promise<void> {
        this.logStep('Click Login');
        await ActionUtils.click(this.page.getByText('Login'), { page: this.page });
    }

    async login(email: string, password: string): Promise<void> {
        this.logStep(`Login with email: ${email}`);
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLogin();
        await this.page.waitForLoadState('networkidle');
    }
}
